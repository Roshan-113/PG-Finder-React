const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SystemSetting = sequelize.define('SystemSetting', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  settingKey: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'setting_key'
  },
  settingValue: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'setting_value'
  },
  description: {
    type: DataTypes.TEXT
  },
  dataType: {
    type: DataTypes.ENUM('string', 'number', 'boolean', 'json'),
    defaultValue: 'string',
    field: 'data_type'
  }
}, {
  tableName: 'system_settings',
  timestamps: true,
  underscored: true
});

module.exports = SystemSetting;
