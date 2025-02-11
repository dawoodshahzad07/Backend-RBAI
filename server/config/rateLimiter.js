const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req) => {
    // Different limits based on user role
    return req.user?.plan === 'AGENCY_VIP' ? 1000 : 100;
  },
  message: 'Too many requests from this IP, please try again later.'
});

module.exports = apiLimiter;
