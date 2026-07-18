import jwt from "jsonwebtoken";

import FILE_CONSTANTS from "../constants/index.js";
import type { ILoginRequestDto } from "../dto/request/auth-request-dto.js";
import type { ILoginResponseDto } from "../dto/response/auth-response-dto.js";
import model from "../models/index.js";

export const loginService = async (
loginInfo: ILoginRequestDto
) => {


  const user = await model.User.findOne({
    where: {
      email: loginInfo.email
    }
  })

  
  if (!user) {
    throw new Error(FILE_CONSTANTS.MESSAGES.AUTH.INVALID_CREDENTIALS);
  }


  if (user.password !== loginInfo.password) {
    throw new Error(FILE_CONSTANTS.MESSAGES.AUTH.INVALID_CREDENTIALS);
  }


  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '24h'
    }
  );

  const response: ILoginResponseDto = {
    message: FILE_CONSTANTS.MESSAGES.AUTH.LOGIN_SUCCESS,
    token,
    result: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };

  return response
};



// /**
//  * Verifies JWT token.
//  *
//  * @param token JWT token.
//  * @returns Decoded payload.
//  */
// export const verifyTokenService = (
//   token: string
// ): IAuthUserDto => {

//   try {

//     return jwt.verify(
//       token,
//       process.env.JWT_SECRET!
//     ) as IAuthUserDto;

//   } catch {

//     throw new AppError(
//       "Invalid or expired token.",
//       401
//     );

//   }

// };