// File: apiVersionMiddleware.js
const apiVersionMiddleware = (req, res, next) => {
    const apiVersion = req.headers['api-version'];
    if (apiVersion !== '1.0') {
      return res.status(400).json({ message: 'Unsupported API version.' });
    }
    next();
  };
  module.exports = apiVersionMiddleware;