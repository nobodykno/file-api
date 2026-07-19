import type {
    NextFunction,
    Response,
  } from "express";

 
  import model from "../models/index.js";
  import FILE_CONSTANTS from "../constants/index.js";
  import { AppError } from "./app-error.js";
  import type { Request } from "express";
  
  const authenticateUser = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const projectId = Number(req.params.projectId);
  
      if (!projectId) {
        return next(
          new AppError(
            FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
            FILE_CONSTANTS.HTTP_STATUS.BAD_REQUEST
          )
        );
      }

const user = req.user;

if (!user) {
  return next(
    new AppError(
      FILE_CONSTANTS.MESSAGES.AUTH.INVALID_TOKEN,
      FILE_CONSTANTS.HTTP_STATUS.UNAUTHORIZED
    )
  );
}
  
      const project = await model.Project.findOne({
        where: {
          id: projectId,
          user_id: req.user?.id,
        },
      });


  
      if (!project) {
        return next(
          new AppError(
            FILE_CONSTANTS.MESSAGES.AUTH.INVALID_TOKEN,
            FILE_CONSTANTS.HTTP_STATUS.UNAUTHORIZED
          )
        );
      }
  
      next();
    } catch (error) {
      next(error);
    }
  };
  
  export default authenticateUser;