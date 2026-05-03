const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  id:               { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tenantId:         { type: DataTypes.INTEGER, allowNull: false, field: 'tenant_id' },
  pgId:             { type: DataTypes.INTEGER, allowNull: false, field: 'pg_id' },
  ownerId:          { type: DataTypes.INTEGER, field: 'owner_id' },
  roomId:           { type: DataTypes.INTEGER, field: 'room_id' },
  bookingDate:      { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'booking_date' },
  moveInDate:       { type: DataTypes.DATE, allowNull: false, field: 'move_in_date' },
  durationMonths:   { type: DataTypes.INTEGER, allowNull: false, field: 'duration_months' },
  rentAmount:       { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'rent_amount' },
  depositAmount:    { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'deposit_amount' },
  totalAmount:      { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'total_amount' },
  specialRequests:  { type: DataTypes.TEXT, field: 'special_requests' },
  status:           { type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'), defaultValue: 'pending' },
  paymentStatus:    { type: DataTypes.ENUM('pending', 'partial', 'completed', 'refunded'), defaultValue: 'pending', field: 'payment_status' },
  razorpayOrderId:  { type: DataTypes.STRING, field: 'razorpay_order_id' },
  razorpayPaymentId:{ type: DataTypes.STRING, field: 'razorpay_payment_id' },
  razorpaySignature:{ type: DataTypes.STRING, field: 'razorpay_signature' }
}, {
  tableName: 'bookings',
  timestamps: true,
  underscored: true
});

module.exports = Booking;
