<<<<<<< HEAD
const express = require('express');
const { makeCall, handleRecording } = require('../controllers/twilioController');
const { generateVoiceResponse } = require('../twiml/voice');

const router = express.Router();

router.post('/call', makeCall);
router.post('/twilio/recording', handleRecording);
router.post('/twilio/voice', (req, res) => {
    res.type('text/xml');
    res.send(generateVoiceResponse());
});

=======
const express = require('express');
const { makeCall, handleRecording } = require('../controllers/twilioController');
const { generateVoiceResponse } = require('../twiml/voice');

const router = express.Router();

router.post('/call', makeCall);
router.post('/twilio/recording', handleRecording);
router.post('/twilio/voice', (req, res) => {
    res.type('text/xml');
    res.send(generateVoiceResponse());
});

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = router; 