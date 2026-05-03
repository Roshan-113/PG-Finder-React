const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
  id:               { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId:           { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
  notificationType: { type: DataTypes.STRING(50), allowNull: false, field: 'notification_type' },
  title:            { type: DataTypes.STRING(200), allowNull: false },
  message:          { type: DataTypes.TEXT, allowNull: false },
  relatedId:        { type: DataTypes.INTEGER, field: 'related_id' },
  isRead:           { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_read' }
}, {
  tableName: 'notifications',
  timestamps: true,
  underscored: true,
  updatedAt: false
});

module.exports = Notification;
