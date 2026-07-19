
import jwt  from "jsonwebtoken";

import FILE_CONSTANTS from "../constants/index.js";
import model from "../models/index.js";


import type { ICreateUserRequestDto, ILoginRequestDto } from "../dto/request/auth-request-dto.js";
import type { ICreateUserResponseDto, ILoginResponseDto } from "../dto/response/auth-response-dto.js";

import utils from "../utils/index.js";
import { AppError } from "../middleware/app-error.js";
import logger from "../logger/index.js";

/**
 * Authenticates a user.
 *
 * Validates the user's credentials and returns a signed JWT
 * together with the authenticated user's details.
 *
 * @param loginInfo User login credentials.
 * @returns Login response containing JWT token and user information.
 */
export const loginService = async (
  loginInfo: ILoginRequestDto
): Promise<ILoginResponseDto> => {



  const user = await model.User.findOne({
    where: {
      email: loginInfo.email,
    },
  });

  if (!user) {
    throw new AppError(
      FILE_CONSTANTS.MESSAGES.AUTH.INVALID_CREDENTIALS,
      FILE_CONSTANTS.HTTP_STATUS.UNAUTHORIZED
    );
  }

  const isPasswordValid = await utils.password.comparePassword(
    loginInfo.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError(
      FILE_CONSTANTS.MESSAGES.AUTH.INVALID_CREDENTIALS,
      FILE_CONSTANTS.HTTP_STATUS.UNAUTHORIZED
    );
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '24h'
    }
  );

  logger.authLogger.login(
    user.email,
  );

  return {
    message: FILE_CONSTANTS.MESSAGES.AUTH.LOGIN_SUCCESS,
    token,
    result: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };


};



export const createUserService = async (
  request: ICreateUserRequestDto
): Promise<ICreateUserResponseDto> => {

  const existingUser = await model.User.findOne({
    where: {
      email: request.email,
    },
  });

  if (existingUser) {
    throw new AppError(
      FILE_CONSTANTS.MESSAGES.AUTH.USER_ALREADY_EXIST,
      FILE_CONSTANTS.HTTP_STATUS.BAD_REQUEST
    );
  }

  const hashedPassword = await utils.password.hashPassword(
    request.password
  );

  const user = await model.User.create({
    name: request.name,
    email: request.email,
    password: hashedPassword,
  });

  logger.authLogger.register(
    user.email
  );

  const response = {
    message: FILE_CONSTANTS.MESSAGES.AUTH.USER_REGISTERED,
    result: {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  };
  return response;
};





