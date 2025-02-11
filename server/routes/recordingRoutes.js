<<<<<<< HEAD
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

=======
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

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = router; 