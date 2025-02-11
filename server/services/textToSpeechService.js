<<<<<<< HEAD
const { googleTextToSpeech } = require('../config/apiConfig');

exports.synthesizeSpeech = async (text) => {
  try {
    const response = await googleTextToSpeech.post('/text:synthesize', {
      input: { text: text },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Wavenet-D'
      },
      audioConfig: {
        audioEncoding: 'MP3'
      }
    });
    return response.data.audioContent;
  } catch (err) {
    throw new Error(`Text-to-Speech Error: ${err.message}`);
  }
=======
const { googleTextToSpeech } = require('../config/apiConfig');

exports.synthesizeSpeech = async (text) => {
  try {
    const response = await googleTextToSpeech.post('/text:synthesize', {
      input: { text: text },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Wavenet-D'
      },
      audioConfig: {
        audioEncoding: 'MP3'
      }
    });
    return response.data.audioContent;
  } catch (err) {
    throw new Error(`Text-to-Speech Error: ${err.message}`);
  }
>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
}; 