const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const PG = require('../models/PG');
const User = require('../models/User');

// Tenant: send inquiry
router.post('/', async (req, res) => {
  if (!req.session.userId || req.session.userRole !== 'tenant')
    return res.status(403).json({ success: false, message: 'Tenants only' });
  try {
    const { pgId, message } = req.body;
    const inquiry = await Inquiry.create({ pgId, tenantId: req.session.userId, message });
    res.status(201).json({ success: true, data: inquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Owner: get inquiries for their PGs
router.get('/owner', async (req, res) => {
  if (!req.session.userId || req.session.userRole !== 'owner')
    return res.status(403).json({ success: false, message: 'Owners only' });
  try {
    const pgs = await PG.findAll({ where: { ownerId: req.session.userId }, attributes: ['id'] });
    const pgIds = pgs.map(p => p.id);
    const inquiries = await Inquiry.findAll({
      where: { pgId: pgIds },
      include: [
        { model: PG, as: 'pg', attributes: ['id', 'name'] },
        { model: User, as: 'tenant', attributes: ['id', 'fullName', 'email', 'phone'] }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Tenant: get my inquiries
router.get('/my', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const inquiries = await Inquiry.findAll({
      where: { tenantId: req.session.userId },
      include: [{ model: PG, as: 'pg', attributes: ['id', 'name', 'city'] }],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Owner: reply to inquiry
router.put('/:id/reply', async (req, res) => {
  if (!req.session.userId || req.session.userRole !== 'owner')
    return res.status(403).json({ success: false, message: 'Owners only' });
  try {
    const { reply } = req.body;
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    await inquiry.update({ reply, status: 'replied' });
    res.json({ success: true, data: inquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
