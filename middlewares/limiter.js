const rateLimit = require('express-rate-limit');

const { LIMITER_TIME_MS, LIMITER_MAX_REQUESTS } = require('../constants');

module.exports = rateLimit({
  windowMs: LIMITER_TIME_MS, // im ms
  max: LIMITER_MAX_REQUESTS, // Limit each IP to 10 requests per `window` (here, per 1 minutes)
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
