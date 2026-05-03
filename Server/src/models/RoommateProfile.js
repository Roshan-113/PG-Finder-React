const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RoommateProfile = sequelize.define('RoommateProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  age: {
    type: DataTypes.INTEGER
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  occupation: {
    type: DataTypes.STRING(100)
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2)
  },
  preferredLocation: {
    type: DataTypes.STRING(255),
    field: 'preferred_location'
  },
  bio: {
    type: DataTypes.TEXT
  },
  interests: {
    type: DataTypes.TEXT
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'roommate_profiles',
  timestamps: true,
  underscored: true
});

module.exports = RoommateProfile;
