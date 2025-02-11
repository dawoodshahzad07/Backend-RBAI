const express = require('express');
const router = express.Router();
const aiAgentController = require('../controllers/aiAgentController');

// Routes
router.post('/create', aiAgentController.createAgent);
router.get('/', aiAgentController.getAllAgents);
router.get('/:id', aiAgentController.getAgentById);
router.put('/:id', aiAgentController.updateAgent);
router.delete('/:id', aiAgentController.deleteAgent);

module.exports = router;
