const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  bookingId: { type: DataTypes.INTEGER, allowNull: false, field: 'booking_id' },
  razorpayOrderId: { type: DataTypes.STRING, field: 'razorpay_order_id' },
  razorpayPaymentId: { type: DataTypes.STRING, field: 'razorpay_payment_id' },
  razorpaySignature: { type: DataTypes.STRING, field: 'razorpay_signature' },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  paymentType: { type: DataTypes.ENUM('deposit', 'rent', 'refund'), allowNull: false, field: 'payment_type' },
  paymentMethod: { type: DataTypes.STRING, field: 'payment_method' },
  status: { type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'), defaultValue: 'pending' },
  paymentDate: { type: DataTypes.DATE, field: 'payment_date' }
}, {
  tableName: 'payments',
  timestamps: true,
  underscored: true
});

module.exports = Payment;
