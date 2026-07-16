
import dotenv from "dotenv";
import { Request, Response, NextFunction } from 'express';
import { ILoginRequestDto } from "../dto/request/auth-request-dto.js";
import { ILoginResponseDto } from "../dto/response/auth-response-dto.js";
import service from "../service/index.js";
import FILE_CONSTANTS from "../constants/index.js";
import { IErrorResponseDto } from "../dto/response/error-response-dto.js";

dotenv.config();


export const login = async (req: Request<{},{},ILoginRequestDto>, res: Response<ILoginResponseDto | IErrorResponseDto>, next: NextFunction) => {

  try {
    const loginInfo:ILoginRequestDto = req.body;

    //Database query to find the particular user with Id
    const logIn = await service.loginService(loginInfo)


    res.status(FILE_CONSTANTS.HTTP_STATUS.OK).json(logIn);

  }
  catch (error) {
    return res
      .status(FILE_CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({
        message: "Failed to login",
        error
      });
  }

};


