const jwt = require('jsonwebtoken');
const envConfig = require('../config/env');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, envConfig.jwtSecret);
    req.user = decoded; // Attach the decoded user payload to the request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token, authorization denied.' });
  }
};

module.exports = authMiddleware;
