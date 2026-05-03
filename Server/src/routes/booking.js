const express = require('express');
const router = express.Router();
const c = require('../controllers/bookingController');

// IMPORTANT: specific routes BEFORE param routes
router.get('/tenant/my-bookings', c.getTenantBookings);
router.get('/owner/bookings', c.getOwnerBookings);
router.get('/pg/:pgId', c.getBookingForm);
router.post('/', c.createBooking);
router.get('/:id/confirmation', c.getBookingConfirmation);
router.get('/:id', c.getBookingById);
router.put('/:id/cancel', c.cancelBooking);
router.put('/:id/payment', c.updatePaymentStatus);
router.put('/:id/status', c.updateBookingStatus);

module.exports = router;
