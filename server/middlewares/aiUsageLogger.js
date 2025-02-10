// File: aiUsageLogger.js
const aiUsageLogger = (req, res, next) => {
    console.log(`User: ${req.user?.id || 'Unknown'}, Endpoint: ${req.originalUrl}, Timestamp: ${new Date().toISOString()}`);
    next();
  };
  module.exports = aiUsageLogger;