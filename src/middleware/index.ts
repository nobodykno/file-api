import logError from "./error-logger.js";
import globalErrorHandler from "./global-error.js";
import globalRateLimiter from "./rate-limiter.js";
import logSuccess from "./success-logger.js";
import validate from "./validate.js";

const middleware = {
    globalErrorHandler,
    globalRateLimiter,
    logSuccess,
    validate,
    logError
};

export default middleware;