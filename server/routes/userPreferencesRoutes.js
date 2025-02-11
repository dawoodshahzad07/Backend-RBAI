const express = require('express');
const router = express.Router();
const userPreferencesController = require('../controllers/userPreferencesController');

// Routes
router.post('/create', userPreferencesController.createPreferences);
router.get('/:userId', userPreferencesController.getPreferencesByUserId);
router.put('/:userId', userPreferencesController.updatePreferences);

module.exports = router;
