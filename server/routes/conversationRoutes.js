const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

// Routes
router.post('/create', conversationController.createConversation);
router.get('/:userId', conversationController.getConversationsByUserId);
router.get('/detail/:id', conversationController.getConversationById);

module.exports = router;
