require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');

const { sequelize } = require('./src/models');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// PostgreSQL session store — sessions persist across server restarts
const pgPool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME     || 'pg_finder',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

app.use(session({
  store: new pgSession({
    pool: pgPool,
    tableName: 'session',
    createTableIfMissing: true,   // auto-creates session table
  }),
  secret: process.env.SESSION_SECRET || 'pgfinder-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}));

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Rate limiting
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

// ── Health check ──────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// ── Email test (dev only) ─────────────────────────────────────
app.get('/test-email', async (req, res) => {
  if (process.env.NODE_ENV === 'production') return res.status(403).json({ message: 'Not allowed in production' });
  const emailService = require('./src/services/emailService');
  const to = req.query.to || process.env.SMTP_USER;
  const ok = await emailService.sendWelcomeEmail(to, 'Test User', 'tenant');
  res.json({ success: ok, to, message: ok ? 'Email sent! Check inbox.' : 'Email failed - check server logs.' });
});

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',          require('./src/routes/auth'));
app.use('/api/pgs',           require('./src/routes/pg'));
app.use('/api/rooms',         require('./src/routes/room'));
app.use('/api/bookings',      require('./src/routes/booking'));
app.use('/api/payments',      require('./src/routes/payment'));
app.use('/api/reviews',       require('./src/routes/review'));
app.use('/api/admin',         require('./src/routes/admin'));
app.use('/api/messages',      require('./src/routes/message'));
app.use('/api/notifications', require('./src/routes/notification'));
app.use('/api/saved-pgs',     require('./src/routes/savedpg'));
app.use('/api/inquiries',     require('./src/routes/inquiry'));
app.use('/api/profile',       require('./src/routes/profile'));
app.use('/api/roommates',     require('./src/routes/roommate'));

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log('✅ PostgreSQL connected');

    // Create tables if they don't exist (safe, no data loss)
    await sequelize.sync({ force: false, alter: false });
    console.log('✅ Tables synced');

    // Seed admin user if not exists
    await seedAdmin();

    // Verify SMTP connection
    try {
      const emailService = require('./src/services/emailService');
      await emailService.transporter.verify();
      console.log('✅ SMTP email server connected');
    } catch (emailErr) {
      console.warn('⚠️  SMTP: Email sending disabled (check SMTP_USER/SMTP_PASS in .env)');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/health`);
      console.log(`📧 Test email:   http://localhost:${PORT}/test-email`);
    });
  } catch (err) {
    console.error('❌ Startup failed:', err.message);
    process.exit(1);
  }
};

async function seedAdmin() {
  try {
    const { User } = require('./src/models');
    const existing = await User.findOne({ where: { email: 'admin@pgfinder.com' } });
    if (!existing) {
      await User.create({
        fullName: 'Admin',
        email: 'admin@pgfinder.com',
        password: 'Admin@123',
        phone: '9000000000',
        role: 'admin',
        isVerified: true,
        isActive: true
      });
      console.log('✅ Admin user created: admin@pgfinder.com / Admin@123');
    }
  } catch (err) {
    console.log('Admin seed skipped:', err.message);
  }
}

startServer();
module.exports = app;
