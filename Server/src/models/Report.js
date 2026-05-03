const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reporterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'reporter_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reportedEntityType: {
    type: DataTypes.ENUM('pg', 'user', 'review', 'message'),
    allowNull: false,
    field: 'reported_entity_type'
  },
  reportedEntityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'reported_entity_id'
  },
  reason: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('pending', 'investigating', 'resolved', 'dismissed'),
    defaultValue: 'pending'
  },
  adminNotes: {
    type: DataTypes.TEXT,
    field: 'admin_notes'
  },
  resolvedAt: {
    type: DataTypes.DATE,
    field: 'resolved_at'
  }
}, {
  tableName: 'reports',
  timestamps: true,
  underscored: true
});

module.exports = Report;
