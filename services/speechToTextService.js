const { googleSpeech } = require('../config/apiConfig');

exports.transcribeAudio = async (audioContent) => {
  try {
    const response = await googleSpeech.post('/speech:recognize', {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US'
      },
      audio: {
        content: audioContent
      }
    });
    return response.data.results[0].alternatives[0].transcript;
  } catch (err) {
    throw new Error(`Speech-to-Text Error: ${err.message}`);
  }
}; 