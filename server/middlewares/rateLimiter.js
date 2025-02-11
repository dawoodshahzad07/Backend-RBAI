<<<<<<< HEAD
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

=======
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

>>>>>>> ebd3dd9c319bfada9595ec5af193b9d0c669dbda
module.exports = loginLimiter; 