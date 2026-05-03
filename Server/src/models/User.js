const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  fullName: { type: DataTypes.STRING, allowNull: false, field: 'full_name' },
  phone: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM('tenant', 'owner', 'admin'), defaultValue: 'tenant', allowNull: false },
  profileImage: { type: DataTypes.STRING, field: 'profile_image' },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_verified' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
  hooks: {
    beforeCreate: async (user) => { if (user.password) user.password = await bcrypt.hash(user.password, 10); },
    beforeUpdate: async (user) => { if (user.changed('password')) user.password = await bcrypt.hash(user.password, 10); }
  }
});

User.prototype.comparePassword = async function(p) { return bcrypt.compare(p, this.password); };
User.prototype.toJSON = function() { const v = { ...this.get() }; delete v.password; return v; };

module.exports = User;
