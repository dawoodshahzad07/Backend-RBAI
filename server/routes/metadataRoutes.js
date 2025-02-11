const express = require('express');
const router = express.Router();
const metadataController = require('../controllers/metadataController');

// Routes
router.post('/add', metadataController.addMetadata);
router.get('/:userId', metadataController.getMetadataByUserId);
router.delete('/:id', metadataController.deleteMetadata);

module.exports = router;
