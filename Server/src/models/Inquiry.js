const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inquiry = sequelize.define('Inquiry', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pgId: { type: DataTypes.INTEGER, allowNull: false, field: 'pg_id' },
  tenantId: { type: DataTypes.INTEGER, allowNull: false, field: 'tenant_id' },
  message: { type: DataTypes.TEXT, allowNull: false },
  reply: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('open', 'replied', 'closed'), defaultValue: 'open' }
}, {
  tableName: 'inquiries',
  timestamps: true,
  underscored: true
});

module.exports = Inquiry;
