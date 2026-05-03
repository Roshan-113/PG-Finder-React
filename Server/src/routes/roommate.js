const express = require('express');
const router = express.Router();
const { User, Booking, PG, Room } = require('../models');
const { Op } = require('sequelize');

// GET /api/roommates — tenants with active bookings (for roommate finder)
// Optional query: pgId — filter to a specific PG
router.get('/', async (req, res) => {
  try {
    const { pgId } = req.query;
    const currentUserId = req.session.userId;

    const bookingWhere = {
      status: { [Op.in]: ['confirmed', 'pending'] }
    };
    if (pgId) bookingWhere.pgId = parseInt(pgId);

    const bookings = await Booking.findAll({
      where: bookingWhere,
      include: [
        {
          model: User, as: 'tenant',
          attributes: ['id', 'fullName', 'profileImage', 'isVerified'],
          where: {
            isActive: true,
            ...(currentUserId ? { id: { [Op.ne]: currentUserId } } : {})
          }
        },
        {
          model: PG, as: 'pg',
          attributes: ['id', 'name', 'city', 'availableRooms', 'totalRooms', 'pgType', 'rentPerMonth', 'images'],
          where: { status: 'approved' }
        },
        {
          model: Room, as: 'room',
          attributes: ['id', 'roomNumber', 'roomType', 'capacity'],
          required: false
        }
      ],
      order: [['created_at', 'DESC']]
    });

    // Deduplicate by tenant (one entry per tenant)
    const seen = new Set();
    const roommates = [];
    for (const b of bookings) {
      if (!b.tenant || seen.has(b.tenant.id)) continue;
      seen.add(b.tenant.id);
      roommates.push({
        userId: b.tenant.id,
        name: b.tenant.fullName,
        profileImage: b.tenant.profileImage || null,
        verified: b.tenant.isVerified,
        pgId: b.pg?.id,
        pgName: b.pg?.name,
        city: b.pg?.city,
        pgType: b.pg?.pgType,
        availableRooms: b.pg?.availableRooms || 0,
        totalRooms: b.pg?.totalRooms || 0,
        rentPerMonth: b.pg?.rentPerMonth,
        pgImages: b.pg?.images || [],
        roomNumber: b.room?.roomNumber || null,
        roomType: b.room?.roomType || null,
      });
    }

    res.json({ success: true, data: roommates });
  } catch (err) {
    console.error('Roommate finder error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/roommates/:id — single roommate profile
router.get('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.findByPk(userId, {
      attributes: ['id', 'fullName', 'profileImage', 'isVerified']
    });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Get their latest active booking
    const booking = await Booking.findOne({
      where: { tenantId: userId, status: { [Op.in]: ['confirmed', 'pending'] } },
      include: [
        { model: PG, as: 'pg', attributes: ['id', 'name', 'city', 'availableRooms', 'totalRooms', 'pgType', 'rentPerMonth', 'images'] },
        { model: Room, as: 'room', attributes: ['id', 'roomNumber', 'roomType', 'capacity'], required: false }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        userId: user.id,
        name: user.fullName,
        profileImage: user.profileImage || null,
        verified: user.isVerified,
        pgId: booking?.pg?.id,
        pgName: booking?.pg?.name,
        city: booking?.pg?.city,
        pgType: booking?.pg?.pgType,
        availableRooms: booking?.pg?.availableRooms || 0,
        totalRooms: booking?.pg?.totalRooms || 0,
        rentPerMonth: booking?.pg?.rentPerMonth,
        pgImages: booking?.pg?.images || [],
        roomNumber: booking?.room?.roomNumber || null,
        roomType: booking?.room?.roomType || null,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
