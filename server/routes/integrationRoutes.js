<<<<<<< HEAD
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

=======
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

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = router; 