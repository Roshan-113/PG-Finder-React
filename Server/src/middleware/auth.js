const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Session-based auth middleware (primary - matches Java session approach)
exports.requireSession = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ success: false, message: 'Not authenticated. Please login.' });
  }
  next();
};

exports.requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ success: false, message: 'Not authenticated.' });
    }
    if (!roles.includes(req.session.userRole)) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }
    next();
  };
};

// JWT-based auth middleware (for API token auth)
exports.protect = async (req, res, next) => {
  try {
    // First check session
    if (req.session && req.session.userId) {
      req.user = { id: req.session.userId, userType: req.session.userRole };
      return next();
    }

    // Then check JWT
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account is deactivated' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized', error: error.message });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.userType || req.session?.userRole;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ success: false, message: `Role ${userRole} is not authorized` });
    }
    next();
  };
};
