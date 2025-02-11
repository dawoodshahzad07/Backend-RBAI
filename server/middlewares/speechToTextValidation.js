// File: speechToTextValidation.js
const speechToTextValidation = (req, res, next) => {
    const { audioData } = req.body;
    if (!audioData || typeof audioData !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing audio data.' });
    }
    next();
  };
  module.exports = speechToTextValidation;