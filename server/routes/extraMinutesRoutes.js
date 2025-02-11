const express = require('express');
const router = express.Router();
const extraMinutesController = require('../controllers/extraMinutesController');

// Routes
router.post('/add', extraMinutesController.addExtraMinutes);
router.get('/:userId', extraMinutesController.getExtraMinutesByUserId);

module.exports = router;
