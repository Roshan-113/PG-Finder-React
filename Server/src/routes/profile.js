const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get profile
router.get('/', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const user = await User.findByPk(req.session.userId, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update profile
router.put('/', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const { fullName, phone, profileImage } = req.body;
    const user = await User.findByPk(req.session.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await user.update({ fullName: fullName || user.fullName, phone: phone || user.phone, profileImage: profileImage || user.profileImage });
    // Update session
    req.session.userName = user.fullName;
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Change password
router.put('/change-password', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.session.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const valid = await user.comparePassword(currentPassword);
    if (!valid) return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    await user.update({ password: newPassword });
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
