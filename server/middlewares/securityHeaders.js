<<<<<<< HEAD
module.exports = (req, res, next) => {
  res.set({
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'self'",
    'X-Permitted-Cross-Domain-Policies': 'none'
  });
  next();
=======
module.exports = (req, res, next) => {
  res.set({
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'self'",
    'X-Permitted-Cross-Domain-Policies': 'none'
  });
  next();
>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
}; 