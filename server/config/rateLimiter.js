const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req) => {
    // Different limits based on user role
    return req.user?.plan === 'AGENCY_VIP' ? 1000 : 100;
  },
  message: 'Too many requests from this IP, please try again later.'
});

const redis = new Redis(process.env.REDIS_URL);

const redisRateLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    expiry: 60, // 1 minute
    prefix: 'rl:'
  }),
  max: 100,
  windowMs: 60 * 1000
});

module.exports = { apiLimiter, redisRateLimiter };
