const { User, PG, Booking, Review, Inquiry, Report, SystemSetting, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, tenants, owners, totalPGs, pendingPGs, totalBookings, activeBookings] = await Promise.all([
      User.count(),
      User.count({ where: { role: 'tenant' } }),
      User.count({ where: { role: 'owner' } }),
      PG.count({ where: { status: 'approved' } }),
      PG.count({ where: { status: 'pending' } }),
      Booking.count(),
      Booking.count({ where: { status: 'confirmed' } })
    ]);

    const revenueResult = await Booking.findOne({
      attributes: [[sequelize.fn('SUM', sequelize.col('total_amount')), 'total']],
      where: { status: { [Op.in]: ['confirmed', 'completed'] } },
      raw: true
    });

    // Recent activities from bookings + registrations
    const recentBookings = await Booking.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      include: [
        { model: User, as: 'tenant', attributes: ['fullName'] },
        { model: PG, as: 'pg', attributes: ['name'] }
      ]
    });

    const recentActivities = recentBookings.map(b => ({
      user_name: b.tenant?.fullName || 'Unknown',
      action_type: 'BOOKING',
      action_description: `Booking for ${b.pg?.name || 'PG'} - Status: ${b.status}`,
      created_at: b.createdAt
    }));

    res.json({
      success: true,
      stats: {
        users: { total: totalUsers, tenants, owners },
        pgs: { total: totalPGs, pending: pendingPGs },
        bookings: { total: totalBookings, active: activeBookings, revenue: revenueResult?.total || 0 }
      },
      recentActivities
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { role, status, page = 1, limit = 20 } = req.query;
    const where = {};
    if (role && role !== 'all') where.role = role;
    if (status === 'active') where.isActive = true;
    if (status === 'inactive') where.isActive = false;

    const { count, rows } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: rows, total: count, page: parseInt(page), pages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPendingPGs = async (req, res) => {
  try {
    const pgs = await PG.findAll({
      where: { status: 'pending' },
      include: [{ model: User, as: 'owner', attributes: ['id', 'fullName', 'email', 'phone'] }],
      order: [['created_at', 'ASC']]
    });
    res.json({ success: true, data: pgs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllPGs = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = {};
    if (status && status !== 'all') where.status = status;
    const { count, rows } = await PG.findAndCountAll({
      where,
      include: [{ model: User, as: 'owner', attributes: ['id', 'fullName', 'email'] }],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: rows, total: count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.approvePG = async (req, res) => {
  try {
    const pg = await PG.findByPk(req.params.id);
    if (!pg) return res.status(404).json({ success: false, message: 'PG not found' });
    await pg.update({ status: 'approved' });
    res.json({ success: true, message: 'PG approved', data: pg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.rejectPG = async (req, res) => {
  try {
    const pg = await PG.findByPk(req.params.id);
    if (!pg) return res.status(404).json({ success: false, message: 'PG not found' });
    await pg.update({ status: 'rejected' });
    res.json({ success: true, message: 'PG rejected', data: pg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { isApproved: false },
      include: [
        { model: PG, as: 'pg', attributes: ['id', 'name'] },
        { model: User, as: 'tenant', attributes: ['id', 'fullName', 'email'] }
      ],
      order: [['created_at', 'ASC']]
    });
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    await review.update({ isApproved: true });
    // Update PG average rating
    const reviews = await Review.findAll({ where: { pgId: review.pgId, isApproved: true } });
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await PG.update({ averageRating: avg.toFixed(2), totalReviews: reviews.length }, { where: { id: review.pgId } });
    res.json({ success: true, message: 'Review approved' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.role === 'admin') return res.status(403).json({ success: false, message: 'Cannot delete admin' });
    await user.destroy();
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await user.update({ isActive: !user.isActive });
    res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'deactivated'}`, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Inquiries (admin: all) ────────────────────────────────────
exports.getAllInquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = {};
    if (status && status !== 'all') where.status = status;
    const { count, rows } = await Inquiry.findAndCountAll({
      where,
      include: [
        { model: PG, as: 'pg', attributes: ['id', 'name', 'city'] },
        { model: User, as: 'tenant', attributes: ['id', 'fullName', 'email', 'phone'] }
      ],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: rows, total: count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Reports ───────────────────────────────────────────────────
exports.getAllReports = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = {};
    if (status && status !== 'all') where.status = status;
    const { count, rows } = await Report.findAndCountAll({
      where,
      include: [{ model: User, as: 'reporter', attributes: ['id', 'fullName', 'email'] }],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: rows, total: count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ success: false, message: 'Report not found' });
    const { status, adminNotes } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;
    if (status === 'resolved' || status === 'dismissed') updates.resolvedAt = new Date();
    await report.update(updates);
    res.json({ success: true, message: 'Report updated', data: report });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── System Settings ───────────────────────────────────────────
exports.getSettings = async (req, res) => {
  try {
    const settings = await SystemSetting.findAll({ order: [['setting_key', 'ASC']] });
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    const [setting, created] = await SystemSetting.findOrCreate({
      where: { settingKey: key },
      defaults: { settingKey: key, settingValue: String(value), description: key }
    });
    if (!created) await setting.update({ settingValue: String(value) });
    res.json({ success: true, message: 'Setting updated', data: setting });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
