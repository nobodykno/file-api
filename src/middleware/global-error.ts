import type { ErrorRequestHandler } from "express";

import { AppError } from "./app-error.js";
import FILE_CONSTANTS from "../constants/index.js";
import logger from "../logger/index.js";

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
      message: FILE_CONSTANTS.MESSAGES.COMMON.SERVER_ERROR,
    });
};

export default globalErrorHandler;