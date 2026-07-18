import type { NextFunction, Request, Response } from "express";

import FILE_CONSTANTS from "../constants/index.js";
import service from "../service/index.js";


/**
 * Upload one or more files to a project.
 *
 * @param req Express request object.
 * @param res Express response object.
 * @param next Express next middleware.
 * @returns Uploaded file details.
 */
export const uploadFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.file.uploadFilesService(
      Number(req.params.projectId),
      req.files as Express.Multer.File[]
    );

   

    return res
      .status(FILE_CONSTANTS.HTTP_STATUS.CREATED)
      .json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch all files belonging to a project.
 *
 * @param req Express request object.
 * @param res Express response object.
 * @param next Express next middleware.
 * @returns List of project files.
 */
export const getProjectFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.file.getProjectFilesService(
      Number(req.params.projectId)
    );

    return res
      .status(FILE_CONSTANTS.HTTP_STATUS.OK)
      .json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a project file.
 *
 * @param req Express request object.
 * @param res Express response object.
 * @param next Express next middleware.
 * @returns Success response after deletion.
 */
export const deleteFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.file.deleteFileService(
      Number(req.params.projectId),
      Number(req.params.fileId)
    );

    return res
      .status(FILE_CONSTANTS.HTTP_STATUS.OK)
      .json(response);
  } catch (error) {
    next(error);
  }
};