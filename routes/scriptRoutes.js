const express = require('express');
const router = express.Router();
const scriptController = require('../controllers/scriptController');

// Routes
router.post('/create', scriptController.createScript);
router.get('/:userId', scriptController.getScriptsByUserId);
router.put('/:id', scriptController.updateScript);
router.delete('/:id', scriptController.deleteScript);

module.exports = router;
