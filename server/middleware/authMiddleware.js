const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger.error(`Authentication error: ${err.message}`);
    res.status(401).json({ message: 'Invalid token' });
  }
}; 