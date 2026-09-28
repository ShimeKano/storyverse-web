const rateLimit = require('express-rate-limit');

module.exports = function createApiRateLimit() {
  return rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false
  });
};
