<<<<<<< HEAD
const { openAI } = require('../config/apiConfig');

exports.generateResponse = async (prompt) => {
  try {
    const response = await openAI.post('/chat/completions', {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 150
    });
    return response.data.choices[0].message.content;
  } catch (err) {
    throw new Error(`OpenAI Error: ${err.message}`);
  }
=======
const { openAI } = require('../config/apiConfig');

exports.generateResponse = async (prompt) => {
  try {
    const response = await openAI.post('/chat/completions', {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 150
    });
    return response.data.choices[0].message.content;
  } catch (err) {
    throw new Error(`OpenAI Error: ${err.message}`);
  }
>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
}; 