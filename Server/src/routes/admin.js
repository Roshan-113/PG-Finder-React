const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/adminController');

const requireAdmin = (req, res, next) => {
  if (!req.session.userId || req.session.userRole !== 'admin')
    return res.status(403).json({ success: false, message: 'Admin access required' });
  next();
};

router.use(requireAdmin);

router.get('/dashboard',          ctrl.getDashboardStats);
router.get('/users',              ctrl.getAllUsers);
router.delete('/users/:id',       ctrl.deleteUser);
router.put('/users/:id/toggle-status', ctrl.toggleUserStatus);
router.get('/pgs',                ctrl.getAllPGs);
router.get('/pgs/pending',        ctrl.getPendingPGs);
router.put('/pgs/:id/approve',    ctrl.approvePG);
router.put('/pgs/:id/reject',     ctrl.rejectPG);
router.get('/reviews/pending',    ctrl.getPendingReviews);
router.put('/reviews/:id/approve', ctrl.approveReview);

router.get('/inquiries',          ctrl.getAllInquiries);

router.get('/reports',            ctrl.getAllReports);
router.put('/reports/:id',        ctrl.updateReport);

router.get('/settings',           ctrl.getSettings);
router.put('/settings/:key',      ctrl.updateSetting);

module.exports = router;
