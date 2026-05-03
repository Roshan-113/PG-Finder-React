const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for current user
router.get('/', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.session.userId },
      order: [['created_at', 'DESC']],
      limit: 50
    });
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Mark all as read — MUST be before /:id/read to avoid route conflict
router.put('/read-all', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    await Notification.update({ isRead: true }, { where: { userId: req.session.userId } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Mark notification as read
router.put('/:id/read', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    await Notification.update({ isRead: true }, { where: { id: req.params.id, userId: req.session.userId } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
