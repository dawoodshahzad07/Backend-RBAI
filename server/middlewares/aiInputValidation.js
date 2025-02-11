// File: aiInputValidation.js
const aiInputValidation = (req, res, next) => {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing AI prompt.' });
    }
    next();
  };
  module.exports = aiInputValidation;