import logError from "./error-logger.js";
import globalErrorHandler from "./global-error.js";
import globalRateLimiter from "./rate-limiter.js";
import logSuccess from "./success-logger.js";
import validate from "./validate.js";
import morganMiddleware from "./morgan.js";
import corsOptions from "./cors.js";
import validateEnv from "../config/validate-env.js";
import authToken from "./auth-token.js";
import authenticateUser from "./user-owner.js";

const middleware = {
    globalErrorHandler,
    globalRateLimiter,
    logSuccess,
    validate,
    logError,
    morganMiddleware,
    corsOptions,
    validateEnv,
    authToken,
    authenticateUser
};

export default middleware;