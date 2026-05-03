const { Room, PG } = require('../models');

exports.createRoom = async (req, res) => {
  try {
    if (!req.session.userId || req.session.userRole !== 'owner') {
      return res.status(403).json({ success: false, message: 'Only owners can add rooms' });
    }
    const { pgId, roomNumber, roomType, capacity, rent, deposit } = req.body;
    const pg = await PG.findByPk(pgId);
    if (!pg) return res.status(404).json({ success: false, message: 'PG not found' });
    if (pg.ownerId !== req.session.userId) return res.status(403).json({ success: false, message: 'Not authorized' });

    const room = await Room.create({ pgId, roomNumber, roomType, capacity, rent, deposit });
    await pg.increment('totalRooms');
    res.status(201).json({ success: true, message: 'Room created', data: room });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create room', error: error.message });
  }
};

exports.getRoomsByPG = async (req, res) => {
  try {
    const rooms = await Room.findAll({ where: { pgId: req.params.pgId } });
    res.json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch rooms', error: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    if (!req.session.userId || req.session.userRole !== 'owner') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    const room = await Room.findByPk(req.params.id, { include: [{ model: PG, as: 'pg' }] });
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    if (room.pg.ownerId !== req.session.userId) return res.status(403).json({ success: false, message: 'Not authorized' });
    await room.update(req.body);
    res.json({ success: true, message: 'Room updated', data: room });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update room', error: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    if (!req.session.userId || req.session.userRole !== 'owner') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    const room = await Room.findByPk(req.params.id, { include: [{ model: PG, as: 'pg' }] });
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    if (room.pg.ownerId !== req.session.userId) return res.status(403).json({ success: false, message: 'Not authorized' });
    const pg = await PG.findByPk(room.pgId);
    await room.destroy();
    if (pg && pg.totalRooms > 0) await pg.decrement('totalRooms');
    res.json({ success: true, message: 'Room deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete room', error: error.message });
  }
};
