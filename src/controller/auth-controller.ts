import type { NextFunction, Request, Response } from "express";

import FILE_CONSTANTS from "../constants/index.js";
import service from "../service/index.js";

import type {
  ICreateUserRequestDto,
  ILoginRequestDto,
} from "../dto/request/auth-request-dto.js";

import type {
  ICreateUserResponseDto,
  ILoginResponseDto,
} from "../dto/response/auth-response-dto.js";

/**
 * Authenticates a user and returns a JWT token.
 *
 * @param req Express request containing login credentials.
 * @param res Express response.
 * @param next Express next middleware.
 */
export const login = async (
  req: Request<object, ILoginResponseDto, ILoginRequestDto>,
  res: Response<ILoginResponseDto>,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await service.auth.loginService(req.body);

    res
      .status(FILE_CONSTANTS.HTTP_STATUS.OK)
      .json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new user.
 *
 * @param req Express request containing user information.
 * @param res Express response.
 * @param next Express next middleware.
 */
export const createUser = async (
  req: Request<object, ICreateUserResponseDto, ICreateUserRequestDto>,
  res: Response<ICreateUserResponseDto>,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await service.auth.createUserService(req.body);

    res
      .status(FILE_CONSTANTS.HTTP_STATUS.CREATED)
      .json(response);
  } catch (error) {
    next(error);
  }
};