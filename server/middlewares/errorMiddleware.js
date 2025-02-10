const errorMiddleware = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ message: 'Unauthorized access.' });
    }
    next(err); // Pass the error to the next middleware (e.g., errorHandler)
  };
  
  module.exports = errorMiddleware;
  