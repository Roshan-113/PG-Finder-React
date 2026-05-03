const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PGPhoto = sequelize.define('PGPhoto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pgId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'pg_id',
    references: {
      model: 'pgs',
      key: 'id'
    }
  },
  photoUrl: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'photo_url'
  },
  photoType: {
    type: DataTypes.ENUM('exterior', 'room', 'common_area', 'amenity', 'other'),
    defaultValue: 'other',
    field: 'photo_type'
  },
  caption: {
    type: DataTypes.STRING(255)
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'display_order'
  }
}, {
  tableName: 'pg_photos',
  timestamps: true,
  underscored: true
});

module.exports = PGPhoto;
