const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PG = sequelize.define('PG', {
  id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ownerId:        { type: DataTypes.INTEGER, allowNull: false, field: 'owner_id' },
  name:           { type: DataTypes.STRING(200), allowNull: false },
  description:    { type: DataTypes.TEXT },
  address:        { type: DataTypes.TEXT, allowNull: false },
  city:           { type: DataTypes.STRING(100), allowNull: false },
  state:          { type: DataTypes.STRING(100), allowNull: false },
  pincode:        { type: DataTypes.STRING(10), allowNull: false },
  latitude:       { type: DataTypes.DECIMAL(10, 8) },
  longitude:      { type: DataTypes.DECIMAL(11, 8) },
  pgType:         { type: DataTypes.ENUM('boys', 'girls', 'co-living'), allowNull: false, field: 'pg_type' },
  totalRooms:     { type: DataTypes.INTEGER, defaultValue: 0, field: 'total_rooms' },
  availableRooms: { type: DataTypes.INTEGER, defaultValue: 0, field: 'available_rooms' },
  rentPerMonth:   { type: DataTypes.DECIMAL(10, 2), defaultValue: 0, field: 'rent_per_month' },
  securityDeposit:{ type: DataTypes.DECIMAL(10, 2), defaultValue: 0, field: 'security_deposit' },
  amenities:      { type: DataTypes.JSONB, defaultValue: [] },
  rules:          { type: DataTypes.TEXT },
  images:         { type: DataTypes.JSONB, defaultValue: [] },
  foodIncluded:   { type: DataTypes.BOOLEAN, defaultValue: false, field: 'food_included' },
  wifiAvailable:  { type: DataTypes.BOOLEAN, defaultValue: false, field: 'wifi_available' },
  acAvailable:    { type: DataTypes.BOOLEAN, defaultValue: false, field: 'ac_available' },
  laundryAvailable: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'laundry_available' },
  parkingAvailable: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'parking_available' },
  status:         { type: DataTypes.ENUM('pending', 'approved', 'rejected', 'inactive'), defaultValue: 'pending' },
  averageRating:  { type: DataTypes.DECIMAL(3, 2), defaultValue: 0, field: 'average_rating' },
  totalReviews:   { type: DataTypes.INTEGER, defaultValue: 0, field: 'total_reviews' }
}, {
  tableName: 'pgs',
  timestamps: true,
  underscored: true
});

module.exports = PG;
