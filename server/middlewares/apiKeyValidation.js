// File: apiKeyValidation.js
const apiKeyValidation = (req, res, next) => {
    const { OPENAI_API_KEY, GOOGLE_APPLICATION_CREDENTIALS } = process.env;
    if (!OPENAI_API_KEY || !GOOGLE_APPLICATION_CREDENTIALS) {
      return res.status(500).json({ message: 'API keys for OpenAI or Google are not configured.' });
    }
    next();
  };
  module.exports = apiKeyValidation;