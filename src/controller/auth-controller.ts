

import type { Request, Response, NextFunction } from 'express';

import FILE_CONSTANTS from "../constants/index.js";
import type { ILoginRequestDto } from "../dto/request/auth-request-dto.js";
import type { ILoginResponseDto } from "../dto/response/auth-response-dto.js";
import service from "../service/index.js";


export const login = async (req: Request<ILoginRequestDto>, res: Response<ILoginResponseDto>, next: NextFunction) => {

  try {
    const loginInfo:ILoginRequestDto = req.body;

    //Database query to find the particular user with Id
    const logIn = await service.auth.loginService(loginInfo)


    res.status(FILE_CONSTANTS.HTTP_STATUS.OK).json(logIn);

  }
  catch (error) {
   next(error)
    }

};


