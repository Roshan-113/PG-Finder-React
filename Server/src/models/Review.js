const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pgId: { type: DataTypes.INTEGER, allowNull: false, field: 'pg_id' },
  tenantId: { type: DataTypes.INTEGER, allowNull: false, field: 'tenant_id' },
  bookingId: { type: DataTypes.INTEGER, field: 'booking_id' },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comment: { type: DataTypes.TEXT },
  cleanlinessRating: { type: DataTypes.INTEGER, field: 'cleanliness_rating' },
  foodRating: { type: DataTypes.INTEGER, field: 'food_rating' },
  safetyRating: { type: DataTypes.INTEGER, field: 'safety_rating' },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_approved' }
}, {
  tableName: 'reviews',
  timestamps: true,
  underscored: true
});

module.exports = Review;
