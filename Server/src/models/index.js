const sequelize = require('../config/database');
const User = require('./User');
const PG = require('./PG');
const Room = require('./Room');
const Booking = require('./Booking');
const Payment = require('./Payment');
const Review = require('./Review');
const Inquiry = require('./Inquiry');
const Message = require('./Message');
const Notification = require('./Notification');
const SavedPG = require('./SavedPG');
const Report = require('./Report');
const SystemSetting = require('./SystemSetting');

// User <-> PG (owner)
User.hasMany(PG, { foreignKey: 'owner_id', as: 'pgs' });
PG.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// PG <-> Room
PG.hasMany(Room, { foreignKey: 'pg_id', as: 'rooms' });
Room.belongsTo(PG, { foreignKey: 'pg_id', as: 'pg' });

// User <-> Booking (tenant)
User.hasMany(Booking, { foreignKey: 'tenant_id', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'tenant_id', as: 'tenant' });

// PG <-> Booking
PG.hasMany(Booking, { foreignKey: 'pg_id', as: 'bookings' });
Booking.belongsTo(PG, { foreignKey: 'pg_id', as: 'pg' });

// Room <-> Booking
Room.hasMany(Booking, { foreignKey: 'room_id', as: 'bookings' });
Booking.belongsTo(Room, { foreignKey: 'room_id', as: 'room' });

// Booking <-> Payment
Booking.hasMany(Payment, { foreignKey: 'booking_id', as: 'payments' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

// PG <-> Review
PG.hasMany(Review, { foreignKey: 'pg_id', as: 'reviews' });
Review.belongsTo(PG, { foreignKey: 'pg_id', as: 'pg' });
User.hasMany(Review, { foreignKey: 'tenant_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'tenant_id', as: 'tenant' });

// PG <-> Inquiry
PG.hasMany(Inquiry, { foreignKey: 'pg_id', as: 'inquiries' });
Inquiry.belongsTo(PG, { foreignKey: 'pg_id', as: 'pg' });
User.hasMany(Inquiry, { foreignKey: 'tenant_id', as: 'inquiries' });
Inquiry.belongsTo(User, { foreignKey: 'tenant_id', as: 'tenant' });

// Message
User.hasMany(Message, { foreignKey: 'sender_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiver_id', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

// Notification
User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// SavedPG
User.hasMany(SavedPG, { foreignKey: 'tenant_id', as: 'savedPGs' });
SavedPG.belongsTo(User, { foreignKey: 'tenant_id', as: 'tenant' });
PG.hasMany(SavedPG, { foreignKey: 'pg_id', as: 'savedBy' });
SavedPG.belongsTo(PG, { foreignKey: 'pg_id', as: 'pg' });

// Report
User.hasMany(Report, { foreignKey: 'reporter_id', as: 'reports' });
Report.belongsTo(User, { foreignKey: 'reporter_id', as: 'reporter' });

module.exports = { sequelize, User, PG, Room, Booking, Payment, Review, Inquiry, Message, Notification, SavedPG, Report, SystemSetting };
