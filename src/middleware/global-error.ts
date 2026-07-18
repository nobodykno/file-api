import type { Request, Response} from "express";


import FILE_CONSTANTS from "../constants/index.js";
import { AppError } from "./app-error.js";
import logger from "../config/logger.js";

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
 const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response) => {


  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

    if (err instanceof AppError) {
      logger.error( err.message,);
        return res.status(err.statusCode).json({
          message: err.message,
        });
       

      }



  return res
    .status(FILE_CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({
      message:FILE_CONSTANTS.MESSAGES.COMMON.SERVER_ERROR
    });
};

export default globalErrorHandler;