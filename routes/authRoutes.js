const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const loginLimiter = require('../middlewares/rateLimiter');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', loginLimiter, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router; 