const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
const Message = require('../models/Message');
const User = require('../models/User');

// Get conversations for current user
router.get('/conversations', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const userId = req.session.userId;
    const [rows] = await sequelize.query(`
      SELECT DISTINCT ON (other_id)
        other_id,
        u.full_name as other_name,
        u.profile_image,
        u.role as other_role,
        m.message_text as last_message,
        m.created_at as last_time,
        (SELECT COUNT(*) FROM messages WHERE receiver_id = :uid AND sender_id = other_id AND is_read = false) as unread_count
      FROM (
        SELECT CASE WHEN sender_id = :uid THEN receiver_id ELSE sender_id END as other_id,
               message_text, created_at
        FROM messages WHERE sender_id = :uid OR receiver_id = :uid
        ORDER BY created_at DESC
      ) m
      JOIN users u ON u.id = other_id
      ORDER BY other_id, m.created_at DESC
    `, { replacements: { uid: userId } });
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get messages between two users
router.get('/:userId', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const me = req.session.userId;
    const other = parseInt(req.params.userId);
    const messages = await Message.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { senderId: me, receiverId: other },
          { senderId: other, receiverId: me }
        ]
      },
      order: [['created_at', 'ASC']],
      limit: 100
    });
    // Mark as read
    await Message.update({ isRead: true }, { where: { senderId: other, receiverId: me, isRead: false } });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Send message
router.post('/', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const { receiverId, messageText } = req.body;
    if (!receiverId || !messageText?.trim()) return res.status(400).json({ success: false, message: 'receiverId and messageText required' });
    const msg = await Message.create({ senderId: req.session.userId, receiverId, messageText });
    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
