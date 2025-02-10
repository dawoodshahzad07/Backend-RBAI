exports.generateVoiceResponse = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Say>Hello, this is a test call. Please leave a message after the beep.</Say>
        <Record 
            action="/twilio/recording"
            recordingStatusCallback="/twilio/recording"
            maxLength="120"
        />
        <Say>Thank you for your message. Goodbye!</Say>
    </Response>`;
}; 