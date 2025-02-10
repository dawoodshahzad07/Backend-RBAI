const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Routes
router.post('/create', sessionController.createSession);
router.get('/:userId', sessionController.getSessionsByUserId);
router.get('/detail/:id', sessionController.getSessionById);

module.exports = router;
