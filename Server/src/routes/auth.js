const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout
router.post('/logout', authController.logout);

// Get current user
router.get('/me', authController.getCurrentUser);

// Verify email
router.get('/verify-email/:token', authController.verifyEmail);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Reset password
router.post('/reset-password/:token', authController.resetPassword);

// Google OAuth - redirect to Google
router.get('/google', authController.googleAuth);

// Google OAuth callback
router.get('/google/callback', authController.googleCallback);

module.exports = router;
