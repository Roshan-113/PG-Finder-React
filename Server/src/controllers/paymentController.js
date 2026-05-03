const crypto = require('crypto');
const { Booking, PG, User, Room } = require('../models');
const emailService = require('../services/emailService');

exports.createOrder = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });

    const { bookingId } = req.body;
    if (!bookingId) return res.status(400).json({ success: false, message: 'bookingId required' });

    const booking = await Booking.findByPk(bookingId, {
      include: [{ model: PG, as: 'pg', attributes: ['id', 'name', 'city'] }]
    });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (booking.tenantId !== req.session.userId) return res.status(403).json({ success: false, message: 'Not authorized' });

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return res.status(500).json({ success: false, message: 'Payment gateway not configured' });
    }

    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const amount = Math.round(parseFloat(booking.totalAmount) * 100); // paise
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `booking_${bookingId}`,
      notes: { booking_id: bookingId, tenant_id: booking.tenantId }
    });

    await booking.update({ razorpayOrderId: order.id });

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: keyId   // Send key to frontend
      },
      booking: {
        id: booking.id,
        totalAmount: booking.totalAmount,
        pgName: booking.pg?.name
      }
    });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ success: false, message: err.message || 'Failed to create order' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      return res.status(400).json({ success: false, message: 'Missing payment details' });
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSig = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (expectedSig !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed - invalid signature' });
    }

    // Update booking
    const booking = await Booking.findByPk(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    await booking.update({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentStatus: 'completed',
      status: 'confirmed'
    });

    // Send payment confirmation email
    try {
      const fullBooking = await Booking.findByPk(bookingId, {
        include: [
          { model: PG, as: 'pg', attributes: ['id', 'name', 'address', 'city', 'rentPerMonth', 'securityDeposit', 'ownerId'] },
          { model: User, as: 'tenant', attributes: ['fullName', 'email'] },
          { model: Room, as: 'room', attributes: ['roomNumber'], required: false }
        ]
      });
      if (fullBooking?.tenant) {
        const owner = await User.findByPk(fullBooking.pg?.ownerId, { attributes: ['fullName', 'phone'] });
        emailService.sendBookingConfirmationEmail({
          toEmail: fullBooking.tenant.email,
          userName: fullBooking.tenant.fullName,
          pgName: fullBooking.pg?.name || '',
          address: fullBooking.pg?.address || '',
          city: fullBooking.pg?.city || '',
          moveInDate: fullBooking.moveInDate
            ? new Date(fullBooking.moveInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
            : '',
          rentAmount: String(parseFloat(fullBooking.rentAmount || 0)),
          securityDeposit: String(parseFloat(fullBooking.depositAmount || 0)),
          bookingId: String(fullBooking.id),
          ownerName: owner?.fullName || '',
          ownerPhone: owner?.phone || '',
          roomNumber: fullBooking.room?.roomNumber || ''
        }).catch(() => {});
      }
    } catch (emailErr) {
      console.error('Payment confirmation email error:', emailErr.message);
    }

    res.json({ success: true, message: 'Payment verified successfully', bookingId });
  } catch (err) {
    console.error('Verify payment error:', err);
    res.status(500).json({ success: false, message: err.message || 'Payment verification failed' });
  }
};

exports.getPaymentDetails = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ success: false, message: 'Not authenticated' });

    const booking = await Booking.findByPk(req.params.bookingId);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    res.json({
      success: true,
      data: {
        bookingId: booking.id,
        rentAmount: booking.rentAmount,
        depositAmount: booking.depositAmount,
        totalAmount: booking.totalAmount,
        paymentStatus: booking.paymentStatus,
        status: booking.status,
        razorpayOrderId: booking.razorpayOrderId,
        razorpayPaymentId: booking.razorpayPaymentId
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
