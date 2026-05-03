const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const crypto = require('crypto');
const sequelize = require('../config/database');
const emailService = require('./emailService');

class AuthService {
  async register(name, email, phone, password, userType) {
    try {
      const existing = await User.findOne({ where: { email } });
      if (existing) return { success: false, message: 'Email already registered' };

      const user = await User.create({
        fullName: name,
        email,
        phone: phone || null,
        password,
        role: userType,
        isVerified: false,
        isActive: true
      });

      // Send welcome email (async, don't block registration)
      emailService.sendWelcomeEmail(email, name, userType).catch(() => {});

      return {
        success: true,
        message: 'Registration successful.',
        user: { id: user.id, name: user.fullName, email: user.email, user_type: user.role }
      };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  }

  async login(email, password, userType) {
    try {
      const user = await User.findOne({ where: { email, isActive: true } });
      if (!user) return { success: false, message: 'Invalid email or password' };
      if (user.role !== userType) return { success: false, message: `Invalid credentials for ${userType} login` };

      const valid = await user.comparePassword(password);
      if (!valid) return { success: false, message: 'Invalid email or password' };

      const token = jwt.sign(
        { userId: user.id, email: user.email, userType: user.role },
        process.env.JWT_SECRET || 'pgfinder-secret',
        { expiresIn: '7d' }
      );

      return {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.fullName,
          email: user.email,
          phone: user.phone,
          user_type: user.role,
          userType: user.role,
          profile_image: user.profileImage,
          profileImage: user.profileImage,
          email_verified: user.isVerified,
          emailVerified: user.isVerified
        },
        token
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  async getUserById(userId) {
    try {
      return await User.findOne({ where: { id: userId, isActive: true } });
    } catch (error) {
      return null;
    }
  }

  async forgotPassword(email) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return { success: true, message: 'If the email exists, a reset link has been sent' };

      const token = crypto.randomBytes(32).toString('hex');
      await sequelize.query(
        'INSERT INTO password_reset_tokens (user_id, token, expires_at, is_used) VALUES ($1, $2, $3, false)',
        { bind: [user.id, token, new Date(Date.now() + 3600000)] }
      );

      const resetLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/change-password?token=${token}`;
      console.log('Password reset link for', email, ':', resetLink);

      // Send password reset email
      emailService.sendPasswordResetEmail(email, user.fullName, resetLink).catch(err => {
        console.error('Failed to send reset email:', err.message);
      });

      return { success: true, message: 'Password reset link has been sent to your email.' };
    } catch (error) {
      console.error('Forgot password error:', error);
      return { success: true, message: 'If the email exists, a reset link has been sent' };
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const [rows] = await sequelize.query(
        'SELECT * FROM password_reset_tokens WHERE token = $1 AND is_used = false AND expires_at > NOW()',
        { bind: [token] }
      );
      if (!rows || rows.length === 0) return { success: false, message: 'Invalid or expired reset token' };

      const hashed = await bcrypt.hash(newPassword, 10);
      await sequelize.query('UPDATE users SET password = $1 WHERE id = $2', { bind: [hashed, rows[0].user_id] });
      await sequelize.query('UPDATE password_reset_tokens SET is_used = true WHERE token = $1', { bind: [token] });
      return { success: true, message: 'Password reset successfully' };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, message: 'Password reset failed' };
    }
  }

  async verifyEmail(token) {
    try {
      const [rows] = await sequelize.query(
        'SELECT * FROM email_verification_tokens WHERE token = $1 AND is_used = false',
        { bind: [token] }
      );
      if (!rows || rows.length === 0) return { success: false, message: 'Invalid or expired token' };

      await sequelize.query('UPDATE users SET is_verified = true WHERE id = $1', { bind: [rows[0].user_id] });
      await sequelize.query('UPDATE email_verification_tokens SET is_used = true WHERE token = $1', { bind: [token] });
      return { success: true, message: 'Email verified successfully' };
    } catch (error) {
      return { success: false, message: 'Email verification failed' };
    }
  }
}

module.exports = AuthService;
