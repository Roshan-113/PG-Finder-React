const express = require('express');
const router = express.Router();
const SavedPG = require('../models/SavedPG');
const PG = require('../models/PG');
const User = require('../models/User');

// Get saved PGs for current tenant
router.get('/', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const saved = await SavedPG.findAll({
      where: { tenantId: req.session.userId },
      include: [{ model: PG, as: 'pg', include: [{ model: User, as: 'owner', attributes: ['id', 'fullName', 'phone'] }] }],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Save a PG
router.post('/:pgId', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const [saved, created] = await SavedPG.findOrCreate({
      where: { tenantId: req.session.userId, pgId: req.params.pgId }
    });
    res.status(created ? 201 : 200).json({ success: true, data: saved, created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Remove saved PG
router.delete('/:pgId', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    await SavedPG.destroy({ where: { tenantId: req.session.userId, pgId: req.params.pgId } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
