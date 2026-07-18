import { Request, Response, NextFunction } from "express";

import FILE_CONSTANTS from "../constants/index.js";
import { AppError } from "./app-error.js";

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
export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }

  console.error("Unhandled Error:", err);

  return res
    .status(FILE_CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({
      message:"error"
    });
};