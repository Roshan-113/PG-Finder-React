const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SavedPG = sequelize.define('SavedPG', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tenantId: { type: DataTypes.INTEGER, allowNull: false, field: 'tenant_id' },
  pgId: { type: DataTypes.INTEGER, allowNull: false, field: 'pg_id' }
}, {
  tableName: 'saved_pgs',
  timestamps: true,
  underscored: true
});

module.exports = SavedPG;
