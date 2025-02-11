const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Dashboard routes
router.get('/overview', authMiddleware, dashboardController.getOverview);
router.get('/recent-outcomes', authMiddleware, dashboardController.getRecentOutcomes);
router.get('/dials-minutes', authMiddleware, dashboardController.getDialsAndMinutes);

module.exports = router; 