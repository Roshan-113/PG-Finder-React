const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getPaymentDetails } = require('../controllers/paymentController');

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.get('/:bookingId', getPaymentDetails);

module.exports = router;
