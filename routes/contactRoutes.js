const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Create Contact
router.post('/', contactController.createContact);

// Get Contact
router.get('/:id', contactController.getContact);

// Update Contact
router.put('/:id', contactController.updateContact);

// Delete Contact
router.delete('/:id', contactController.deleteContact);

module.exports = router; 