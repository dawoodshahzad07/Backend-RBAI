const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./envConfig');

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '7d', // Token expires in 7 days
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
