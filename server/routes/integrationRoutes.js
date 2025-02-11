const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integrationController');

// Create Integration
router.post('/', integrationController.createIntegration);

// Get Integration
router.get('/:id', integrationController.getIntegration);

// Update Integration
router.put('/:id', integrationController.updateIntegration);

// Delete Integration
router.delete('/:id', integrationController.deleteIntegration);

module.exports = router; 