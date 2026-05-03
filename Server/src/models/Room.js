const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pgId: { type: DataTypes.INTEGER, allowNull: false, field: 'pg_id' },
  roomNumber: { type: DataTypes.STRING, allowNull: false, field: 'room_number' },
  roomType: { type: DataTypes.ENUM('single', 'double', 'triple', 'dormitory'), allowNull: false, field: 'room_type' },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
  occupied: { type: DataTypes.INTEGER, defaultValue: 0 },
  rent: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  deposit: { type: DataTypes.DECIMAL(10, 2) },
  isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_available' },
  amenities: { type: DataTypes.JSONB, defaultValue: [] }
}, {
  tableName: 'rooms',
  timestamps: true,
  underscored: true
});

module.exports = Room;
