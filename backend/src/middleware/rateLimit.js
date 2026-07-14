const { AppError } = require('../lib/errors');

const buckets = new Map();

function createRateLimiter({ windowMs = 60_000, max = 100 } = {}) {
  return (req, res, next) => {
    const key = `${req.ip}:${req.baseUrl || req.path}`;
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || now > bucket.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (bucket.count >= max) {
      return next(new AppError('Too many requests, please try again later.', 429));
    }

    bucket.count += 1;
    return next();
  };
}

module.exports = {
  createRateLimiter
};
