const { PG, User, Room, Review, SavedPG } = require('../models');
const { Op } = require('sequelize');

const pgInclude = [
  { model: User, as: 'owner', attributes: ['id', 'fullName', 'phone', 'email', 'profileImage'] }
];

exports.getAllPGs = async (req, res) => {
  try {
    const { city, pgType, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
    const where = { status: 'approved' };
    if (city) where.city = { [Op.iLike]: `%${city}%` };
    if (pgType && pgType !== 'all') where.pgType = pgType;
    if (minPrice || maxPrice) {
      where.rentPerMonth = {};
      if (minPrice) where.rentPerMonth[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.rentPerMonth[Op.lte] = parseFloat(maxPrice);
    }
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { count, rows } = await PG.findAndCountAll({
      where, include: pgInclude,
      limit: parseInt(limit), offset,
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: rows, total: count, page: parseInt(page), totalPages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPGById = async (req, res) => {
  try {
    const pg = await PG.findByPk(req.params.id, {
      include: [
        ...pgInclude,
        { model: Room, as: 'rooms' },
        { model: Review, as: 'reviews', where: { isApproved: true }, required: false,
          include: [{ model: User, as: 'tenant', attributes: ['id', 'fullName', 'profileImage'] }] }
      ]
    });
    if (!pg) return res.status(404).json({ success: false, message: 'PG not found' });
    res.json({ success: true, data: pg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.searchPGs = async (req, res) => {
  try {
    const { q, city, pgType } = req.query;
    const where = { status: 'approved' };
    if (q) where[Op.or] = [
      { name: { [Op.iLike]: `%${q}%` } },
      { description: { [Op.iLike]: `%${q}%` } },
      { address: { [Op.iLike]: `%${q}%` } }
    ];
    if (city) where.city = { [Op.iLike]: `%${city}%` };
    if (pgType && pgType !== 'all') where.pgType = pgType;
    const pgs = await PG.findAll({ where, include: pgInclude, limit: 50, order: [['created_at', 'DESC']] });
    res.json({ success: true, data: pgs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOwnerPGs = async (req, res) => {
  try {
    if (!req.session.userId || req.session.userRole !== 'owner')
      return res.status(403).json({ success: false, message: 'Owners only' });
    const pgs = await PG.findAll({
      where: { ownerId: req.session.userId },
      include: [{ model: Room, as: 'rooms' }],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: pgs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createPG = async (req, res) => {
  try {
    if (!req.session.userId || req.session.userRole !== 'owner')
      return res.status(403).json({ success: false, message: 'Owners only' });
    const pg = await PG.create({ ...req.body, ownerId: req.session.userId, status: 'pending' });
    res.status(201).json({ success: true, message: 'PG listing created. Pending admin approval.', data: pg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updatePG = async (req, res) => {
  try {
    if (!req.session.userId || req.session.userRole !== 'owner')
      return res.status(403).json({ success: false, message: 'Owners only' });
    const pg = await PG.findOne({ where: { id: req.params.id, ownerId: req.session.userId } });
    if (!pg) return res.status(404).json({ success: false, message: 'PG not found' });
    await pg.update(req.body);
    res.json({ success: true, data: pg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deletePG = async (req, res) => {
  try {
    if (!req.session.userId || req.session.userRole !== 'owner')
      return res.status(403).json({ success: false, message: 'Owners only' });
    const pg = await PG.findOne({ where: { id: req.params.id, ownerId: req.session.userId } });
    if (!pg) return res.status(404).json({ success: false, message: 'PG not found' });
    await pg.destroy();
    res.json({ success: true, message: 'PG deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
