const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Routes
router.post('/send', notificationController.sendNotification);
router.get('/:userId', notificationController.getNotificationsByUserId);

module.exports = router;
