const { Booking, PG, User, Room, Notification } = require('../models');
const sequelize = require('../config/database');
const emailService = require('./emailService');

class BookingService {
  async getPGForBooking(pgId) {
    return PG.findOne({
      where: { id: pgId, status: 'approved' },
      include: [{ model: User, as: 'owner', attributes: ['id', 'fullName', 'phone', 'email'] }]
    });
  }

  async createBooking({ tenantId, pgId, moveInDate, duration, specialRequests }) {
    const t = await sequelize.transaction();
    try {
      const pg = await PG.findByPk(pgId, { transaction: t });
      if (!pg) { await t.rollback(); return { success: false, message: 'PG not found' }; }
      if (pg.status !== 'approved') { await t.rollback(); return { success: false, message: 'PG is not available' }; }

      const dur = parseInt(duration) || 1;
      const rentAmount = parseFloat(pg.rentPerMonth || 0) * dur;
      const depositAmount = parseFloat(pg.securityDeposit || 0);
      const totalAmount = rentAmount + depositAmount;

      const room = await Room.findOne({ where: { pgId, isAvailable: true }, transaction: t });

      const booking = await Booking.create({
        tenantId, pgId,
        roomId: room ? room.id : null,
        bookingDate: new Date(),
        moveInDate: new Date(moveInDate),
        durationMonths: dur,
        rentAmount, depositAmount, totalAmount,
        specialRequests: specialRequests || null,
        status: 'pending',
        paymentStatus: 'pending'
      }, { transaction: t });

      await t.commit();

      // Create notification for tenant
      await Notification.create({
        userId: tenantId,
        notificationType: 'booking',
        title: 'Booking Created',
        message: `Your booking for ${pg.name} has been created. Awaiting confirmation.`,
        relatedId: booking.id
      }).catch(() => {});

      // Send booking confirmation email
      const tenant = await User.findByPk(tenantId, { attributes: ['fullName', 'email'] });
      const owner = await User.findByPk(pg.ownerId, { attributes: ['fullName', 'phone'] });
      if (tenant) {
        emailService.sendBookingConfirmationEmail({
          toEmail: tenant.email,
          userName: tenant.fullName,
          pgName: pg.name,
          address: pg.address,
          city: pg.city,
          moveInDate: new Date(moveInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          rentAmount: String(parseFloat(pg.rentPerMonth || 0)),
          securityDeposit: String(parseFloat(pg.securityDeposit || 0)),
          bookingId: String(booking.id),
          ownerName: owner?.fullName || '',
          ownerPhone: owner?.phone || '',
          roomNumber: room?.roomNumber || ''
        }).catch(() => {});
      }

      return { success: true, booking: await this.getBookingById(booking.id) };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async getBookingById(id) {
    return Booking.findByPk(id, {
      include: [
        { model: PG, as: 'pg', attributes: ['id', 'name', 'address', 'city', 'state', 'images', 'rentPerMonth'] },
        { model: User, as: 'tenant', attributes: ['id', 'fullName', 'email', 'phone'] },
        { model: Room, as: 'room', attributes: ['id', 'roomNumber', 'roomType', 'rent'], required: false }
      ]
    });
  }

  async getTenantBookings(tenantId) {
    return Booking.findAll({
      where: { tenantId },
      include: [
        {
          model: PG, as: 'pg', attributes: ['id', 'name', 'address', 'city', 'images', 'rentPerMonth'],
          include: [{ model: User, as: 'owner', attributes: ['id', 'fullName', 'phone'] }]
        },
        { model: User, as: 'tenant', attributes: ['id', 'fullName', 'email', 'phone'] }
      ],
      order: [['created_at', 'DESC']]
    });
  }

  async getOwnerBookings(ownerId) {
    const pgs = await PG.findAll({ where: { ownerId }, attributes: ['id'] });
    const pgIds = pgs.map(p => p.id);
    if (!pgIds.length) return [];
    return Booking.findAll({
      where: { pgId: pgIds },
      include: [
        { model: PG, as: 'pg', attributes: ['id', 'name', 'address', 'city'] },
        { model: User, as: 'tenant', attributes: ['id', 'fullName', 'email', 'phone'] }
      ],
      order: [['created_at', 'DESC']]
    });
  }

  async cancelBooking(bookingId, tenantId) {
    const booking = await Booking.findOne({ where: { id: bookingId, tenantId } });
    if (!booking) return { success: false, message: 'Booking not found' };
    if (['cancelled', 'completed'].includes(booking.status))
      return { success: false, message: `Cannot cancel a ${booking.status} booking` };
    await booking.update({ status: 'cancelled' });
    return { success: true };
  }

  async updatePaymentStatus(bookingId, tenantId, data) {
    const booking = await Booking.findOne({ where: { id: bookingId, tenantId } });
    if (!booking) return { success: false, message: 'Booking not found' };
    const update = {};
    if (data.paymentStatus) update.paymentStatus = data.paymentStatus;
    if (data.bookingStatus) update.status = data.bookingStatus;
    if (data.razorpayOrderId) update.razorpayOrderId = data.razorpayOrderId;
    if (data.razorpayPaymentId) update.razorpayPaymentId = data.razorpayPaymentId;
    if (data.razorpaySignature) update.razorpaySignature = data.razorpaySignature;
    await booking.update(update);
    return { success: true, booking };
  }
}

module.exports = BookingService;
