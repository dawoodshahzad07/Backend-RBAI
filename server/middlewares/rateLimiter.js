const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: 'Too many login attempts, please try again after 15 minutes',
    handler: (req, res) => {
        res.status(429).json({
            message: 'Too many login attempts, please try again after 15 minutes'
        });
    }
});

module.exports = loginLimiter; 