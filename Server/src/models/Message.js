const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  senderId:    { type: DataTypes.INTEGER, allowNull: false, field: 'sender_id' },
  receiverId:  { type: DataTypes.INTEGER, allowNull: false, field: 'receiver_id' },
  pgId:        { type: DataTypes.INTEGER, field: 'pg_id' },
  messageText: { type: DataTypes.TEXT, allowNull: false, field: 'message_text' },
  isRead:      { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_read' }
}, {
  tableName: 'messages',
  timestamps: true,
  underscored: true,
  updatedAt: false
});

module.exports = Message;
