const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Routes
router.post('/generate', analyticsController.generateAnalytics);
router.get('/:userId', analyticsController.getAnalyticsByUserId);

module.exports = router;
