
import jwt from "jsonwebtoken";
import type {  NextFunction, Response } from "express";




import { AppError } from "./app-error.js";
import FILE_CONSTANTS from "../constants/index.js";
import type { Request } from "express";
import type { IJwtPayload } from "../dto/request/auth-request-dto.js";



const authToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void  => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(
      new AppError(
        FILE_CONSTANTS.MESSAGES.AUTH.TOKEN_NOT_FOUND,
        FILE_CONSTANTS.HTTP_STATUS.UNAUTHORIZED
      )
    );
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    )  as IJwtPayload;
    if (typeof decoded === "string") {
      return next(
        new AppError(
          FILE_CONSTANTS.MESSAGES.AUTH.INVALID_TOKEN,
          FILE_CONSTANTS.HTTP_STATUS.UNAUTHORIZED
        )
      );
    }
    

    req.user = decoded;

    next();
  } catch {
    next(
      new AppError(
        FILE_CONSTANTS.MESSAGES.AUTH.INVALID_TOKEN,
        FILE_CONSTANTS.HTTP_STATUS.UNAUTHORIZED
      )
    );
  }
};





export default authToken;