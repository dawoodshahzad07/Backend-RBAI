const express = require('express');
const router = express.Router();
const recordingController = require('../controllers/recordingController');

// Create Recording
router.post('/', recordingController.createRecording);

// Get Recording
router.get('/:id', recordingController.getRecording);

// Update Recording
router.put('/:id', recordingController.updateRecording);

// Delete Recording
router.delete('/:id', recordingController.deleteRecording);

const { transcribeRecording } = require('../controllers/recordingController');
router.post('/recordings/:id/transcribe', transcribeRecording);

module.exports = router; 