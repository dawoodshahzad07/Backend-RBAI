const twilio = require('twilio');
const { transcribeRecording } = require('./recordingController');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const Recording = require('../models/recordingModel');

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const baseUrl = process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_URL
    : process.env.DEVELOPMENT_URL || 'http://localhost:5000';

exports.makeCall = async (req, res) => {
    try {
        const { to, from } = req.body;
        
        const call = await client.calls.create({
            url: `${baseUrl}/twilio/voice`,
            to,
            from: process.env.TWILIO_PHONE_NUMBER, // Use your Twilio number
            record: true
        });

        res.status(200).json({ 
            message: 'Call initiated',
            callSid: call.sid
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.handleRecording = async (req, res) => {
    try {
        const { RecordingUrl, CallSid, RecordingDuration, RecordingStatus } = req.body;
        
        if (RecordingStatus !== 'completed') {
            return res.status(400).json({ message: 'Recording not completed' });
        }

        // Save recording details
        const recording = await Recording.create({
            callId: CallSid,
            recordingUrl: RecordingUrl,
            duration: RecordingDuration,
            status: 'pending_transcription'
        });

        // Transcribe recording
        const transcription = await transcribeRecording(recording._id);

        // Update recording status
        recording.status = 'transcribed';
        await recording.save();

        res.status(200).json({ transcription });
    } catch (err) {
        console.error('Recording handling error:', err);
        res.status(500).json({ message: 'Failed to process recording' });
    }
};

// Add this middleware for webhook validation
exports.validateTwilioWebhook = (req, res, next) => {
    const signature = req.headers['x-twilio-signature'];
    const url = process.env.NODE_ENV === 'production' 
        ? 'https://ca7e-111-88-18-125.ngrok-free.app/twilio/recording' 
        : 'https://ca7e-111-88-18-125.ngrok-free.app/twilio/recording';
    
    if (!twilio.validateRequest(
        process.env.TWILIO_AUTH_TOKEN,
        signature,
        url,
        req.body
    )) {
        return res.status(403).json({ message: 'Invalid Twilio request' });
    }
    next();
}; 