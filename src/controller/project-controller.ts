import type { NextFunction, Request, Response} from "express";

import FILE_CONSTANTS from "../constants/index.js";
import type {
  ICreateProjectRequestDto,
  IUpdateProjectRequestDto,
} from "../dto/request/project-request-dto.js";
import type {
  ICreateProjectResponseDto,
  IDeleteProjectResponseDto,
  IGetAllProjectsResponseDto,
  IGetProjectResponseDto,
  IUpdateProjectResponseDto,
} from "../dto/response/project-response-dto.js";
import service from "../service/index.js";

/**
 * Creates a new project.
 *
 * @param req - Express request containing project details.
 * @param res - Express response used to return the created project.
 * @param next - Express middleware function for error handling.
 * @returns A JSON response containing the created project details.
 */
export const createProject = async (
  req: Request<object,ICreateProjectResponseDto,ICreateProjectRequestDto>,
  res: Response<ICreateProjectResponseDto>,
  next: NextFunction
) => {
  try {
    const response = await service.project.createProjectService(req.body);

    return res
      .status(FILE_CONSTANTS.HTTP_STATUS.CREATED)
      .json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves all projects.
 *
 * @param req - Express request object.
 * @param res - Express response used to return all projects.
 * @param next - Express middleware function for error handling.
 * @returns A JSON response containing all projects.
 */
export const getAllProjects = async (
  req: Request,
  res: Response<IGetAllProjectsResponseDto>,
  next: NextFunction
) => {
  try {
    const project = await service.project.getAllProjectsService();

    const response:IGetAllProjectsResponseDto = {
      message:FILE_CONSTANTS.MESSAGES.PROJECT.FETCH_SUCCESS,
      result:project.result
    };



    return res
      .status(FILE_CONSTANTS.HTTP_STATUS.OK)
      .json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a project by its ID.
 *
 * @param req - Express request containing the project ID.
 * @param res - Express response used to return the project.
 * @param next - Express middleware function for error handling.
 * @returns A JSON response containing the requested project.
 */
export const getProjectById = async (
  req: Request<{ projectId: string }>,
  res: Response<IGetProjectResponseDto>,
  next: NextFunction
) => {
  try {
    const response = await service.project.getProjectByIdService(
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
 * Updates an existing project.
 *
 * @param req - Express request containing the project ID and updated project details.
 * @param res - Express response used to return the updated project.
 * @param next - Express middleware function for error handling.
 * @returns A JSON response containing the updated project details.
 */
export const updateProject = async (
  req: Request<{ projectId: string }, IUpdateProjectRequestDto>,
  res: Response<IUpdateProjectResponseDto>,
  next: NextFunction
) => {
  try {
    const response = await service.project.updateProjectService(
      Number(req.params.projectId),
      req.body
    );

    return res
      .status(FILE_CONSTANTS.HTTP_STATUS.OK)
      .json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a project and its associated files and jobs.
 *
 * @param req - Express request containing the project ID.
 * @param res - Express response confirming deletion.
 * @param next - Express middleware function for error handling.
 * @returns A JSON response indicating successful deletion.
 */
export const deleteProject = async (
  req: Request<{ projectId: string }>,
  res: Response<IDeleteProjectResponseDto>,
  next: NextFunction
) => {
  try {
    const response = await service.project.deleteProjectService(
      Number(req.params.projectId)
    );

    return res
      .status(FILE_CONSTANTS.HTTP_STATUS.OK)
      .json(response);
  } catch (error) {
    next(error);
  }
};