const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ActivityLog = sequelize.define('ActivityLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  actionType: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'action_type'
  },
  actionDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'action_description'
  },
  entityType: {
    type: DataTypes.STRING(50),
    field: 'entity_type'
  },
  entityId: {
    type: DataTypes.INTEGER,
    field: 'entity_id'
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    field: 'ip_address'
  },
  userAgent: {
    type: DataTypes.STRING(255),
    field: 'user_agent'
  }
}, {
  tableName: 'activity_logs',
  timestamps: true,
  underscored: true,
  updatedAt: false
});

module.exports = ActivityLog;
