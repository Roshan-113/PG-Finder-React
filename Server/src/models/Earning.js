const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Earning = sequelize.define('Earning', {
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
  bookingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'booking_id',
    references: {
      model: 'bookings',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  transactionType: {
    type: DataTypes.ENUM('booking', 'refund', 'commission'),
    allowNull: false,
    field: 'transaction_type'
  },
  transactionDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'transaction_date'
  },
  paymentMethod: {
    type: DataTypes.STRING(50),
    field: 'payment_method'
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'earnings',
  timestamps: true,
  underscored: true,
  updatedAt: false
});

module.exports = Earning;
