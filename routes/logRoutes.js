const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// Routes
router.post('/create', logController.createLog);
router.get('/:userId', logController.getLogsByUserId);

module.exports = router;
