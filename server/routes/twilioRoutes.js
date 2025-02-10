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

module.exports = router; 