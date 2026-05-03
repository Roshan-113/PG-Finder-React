const AuthService = require('../services/authService');
const authService = new AuthService();
const https = require('https');
const querystring = require('querystring');

// Google OAuth config - same keys as Java backend
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

class AuthController {
  // Register new user
  async register(req, res) {
    try {
      const { name, email, phone, password, confirmPassword, userType } = req.body;

      // Validate password confirmation
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'Passwords do not match'
        });
      }

      // Default to tenant if not specified
      const type = userType || 'tenant';

      // Register user
      const result = await authService.register(name, email, phone, password, type);

      if (result.success) {
        return res.status(201).json({
          success: true,
          message: result.message,
          user: result.user
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during registration'
      });
    }
  }

  // Login user
  async login(req, res) {
    try {
      const { email, password, userType } = req.body;

      // Default to tenant if not specified
      const type = userType || 'tenant';

      // Authenticate user
      const result = await authService.login(email, password, type);

      if (result.success) {
        // Create session
        req.session.userId = result.user.id;
        req.session.userEmail = result.user.email;
        req.session.userName = result.user.name;
        req.session.userRole = result.user.userType || result.user.user_type;
        req.session.userProfileImage = result.user.profileImage || result.user.profile_image;
        req.session.emailVerified = result.user.emailVerified || result.user.email_verified;

        return res.status(200).json({
          success: true,
          message: result.message,
          user: {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            phone: result.user.phone,
            userType: result.user.userType || result.user.user_type,
            profileImage: result.user.profileImage || result.user.profile_image,
            emailVerified: result.user.emailVerified || result.user.email_verified
          },
          token: result.token
        });
      } else {
        return res.status(401).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during login'
      });
    }
  }

  // Logout user
  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error logging out'
          });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({
          success: true,
          message: 'Logged out successfully'
        });
      });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during logout'
      });
    }
  }

  // Get current user
  async getCurrentUser(req, res) {
    try {
      if (!req.session.userId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      const user = await authService.getUserById(req.session.userId);

      if (user) {
        return res.status(200).json({
          success: true,
          user: {
            id: user.id,
            name: user.fullName,
            email: user.email,
            phone: user.phone,
            userType: user.role,
            profileImage: user.profileImage,
            emailVerified: user.isVerified
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    } catch (error) {
      console.error('Get current user error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Verify email
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;

      const result = await authService.verifyEmail(token);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Verify email error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Forgot password
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const result = await authService.forgotPassword(email);

      return res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Reset password
  async resetPassword(req, res) {
    try {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: 'Passwords do not match'
        });
      }

      const result = await authService.resetPassword(token, password);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message
        });
      } else {
        return res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Reset password error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
  // Google OAuth - redirect to Google
  async googleAuth(req, res) {
    const userType = req.query.userType || 'tenant';
    req.session.oauthUserType = userType;
    const state = Math.random().toString(36).substring(7);
    req.session.oauthState = state;

    const params = querystring.stringify({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      access_type: 'offline',
      prompt: 'select_account'
    });
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
  }

  // Google OAuth callback
  async googleCallback(req, res) {
    const { code, state } = req.query;
    const userType = req.session.oauthUserType || 'tenant';

    if (!code) {
      return res.redirect(`${CLIENT_URL}/login?error=google_auth_failed`);
    }

    try {
      // Exchange code for tokens
      const tokenData = await new Promise((resolve, reject) => {
        const postData = querystring.stringify({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code'
        });
        const options = {
          hostname: 'oauth2.googleapis.com',
          path: '/token',
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': postData.length }
        };
        const req2 = https.request(options, (r) => {
          let data = '';
          r.on('data', chunk => data += chunk);
          r.on('end', () => resolve(JSON.parse(data)));
        });
        req2.on('error', reject);
        req2.write(postData);
        req2.end();
      });

      if (!tokenData.access_token) {
        return res.redirect(`${CLIENT_URL}/login?error=token_failed`);
      }

      // Get user info from Google
      const userInfo = await new Promise((resolve, reject) => {
        const options = {
          hostname: 'www.googleapis.com',
          path: '/oauth2/v2/userinfo',
          method: 'GET',
          headers: { Authorization: `Bearer ${tokenData.access_token}` }
        };
        const req3 = https.request(options, (r) => {
          let data = '';
          r.on('data', chunk => data += chunk);
          r.on('end', () => resolve(JSON.parse(data)));
        });
        req3.on('error', reject);
        req3.end();
      });

      // Find or create user
      const { User } = require('../models');
      let user = await User.findOne({ where: { email: userInfo.email } });

      if (!user) {
        user = await User.create({
          fullName: userInfo.name || userInfo.email.split('@')[0],
          email: userInfo.email,
          password: Math.random().toString(36) + Math.random().toString(36), // random password for OAuth users
          phone: null,
          role: userType,
          isVerified: true,
          isActive: true
        });
      }

      // Create session
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      req.session.userName = user.fullName;
      req.session.userRole = user.role;

      // Redirect to frontend with user data
      const userData = encodeURIComponent(JSON.stringify({
        id: user.id,
        name: user.fullName,
        email: user.email,
        userType: user.role,
        profileImage: user.profileImage
      }));

      const redirectPath = user.role === 'admin' ? '/admin/dashboard' : user.role === 'owner' ? '/owner/dashboard' : '/';
      res.redirect(`${CLIENT_URL}/auth/google/success?user=${userData}&redirect=${redirectPath}`);

    } catch (err) {
      console.error('Google OAuth error:', err);
      res.redirect(`${CLIENT_URL}/login?error=google_auth_failed`);
    }
  }
}

module.exports = new AuthController();
