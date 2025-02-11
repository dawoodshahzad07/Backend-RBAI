<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const loginLimiter = require('../middlewares/rateLimiter');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', loginLimiter, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

=======
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const loginLimiter = require('../middlewares/rateLimiter');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', loginLimiter, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = router; 