const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OwnerDocument = sequelize.define('OwnerDocument', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'owner_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  documentType: {
    type: DataTypes.ENUM('id_proof', 'address_proof', 'property_proof'),
    allowNull: false,
    field: 'document_type'
  },
  documentUrl: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'document_url'
  },
  verificationStatus: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
    field: 'verification_status'
  },
  verifiedAt: {
    type: DataTypes.DATE,
    field: 'verified_at'
  }
}, {
  tableName: 'owner_documents',
  timestamps: true,
  underscored: true,
  createdAt: 'uploaded_at',
  updatedAt: false
});

module.exports = OwnerDocument;
