const { dialogflow } = require('../config/apiConfig');

exports.detectIntent = async (sessionId, query, languageCode = 'en-US') => {
  try {
    const response = await dialogflow.post(`/sessions/${sessionId}:detectIntent`, {
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode
        }
      }
    });
    return response.data;
  } catch (err) {
    throw new Error(`Dialogflow Error: ${err.message}`);
  }
};

exports.createSession = async (sessionId) => {
  try {
    const response = await dialogflow.post(`/sessions/${sessionId}`);
    return response.data;
  } catch (err) {
    throw new Error(`Dialogflow Session Creation Error: ${err.message}`);
  }
}; 