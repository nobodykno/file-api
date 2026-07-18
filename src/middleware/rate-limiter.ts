import rateLimit from "express-rate-limit";

import FILE_CONSTANTS from "../constants/index.js";

 const globalRateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),

  max: Number(process.env.RATE_LIMIT_MAX),

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    message: FILE_CONSTANTS.MESSAGES.COMMON.T00_MANY_REQUEST,
  },
});


export default globalRateLimiter;