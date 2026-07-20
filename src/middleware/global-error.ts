import type { ErrorRequestHandler } from "express";

import { AppError } from "./app-error.js";
import FILE_CONSTANTS from "../constants/index.js";
import logger from "../logger/index.js";

/**
 * Global error handling middleware.
 *
 *
 * @param err - The error thrown by the application.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 * @returns A JSON response containing the error message.
 */
const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  void next;

  logger.logError({
    action: FILE_CONSTANTS.MESSAGES.ACTION.UNHANDLED_ERROR,
    module: FILE_CONSTANTS.MESSAGES.MODULE.GLOBAL_ERROR,
    message: err.message,
    errorName: err.name,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    data: err,
  });

  

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res
    .status(FILE_CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({
      message: err,
    });
};

export default globalErrorHandler;