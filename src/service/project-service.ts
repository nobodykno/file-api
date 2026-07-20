import model from "../models/index.js";

import FILE_CONSTANTS from "../constants/index.js";
import type { ICreateProjectRequestDto, IUpdateProjectRequestDto } from "../dto/request/project-request-dto.js";
import type { ICreateProjectResponseDto, IDeleteProjectResponseDto, IGetAllProjectsResponseDto, IGetProjectResponseDto, IUpdateProjectResponseDto } from "../dto/response/project-response-dto.js";

import { AppError } from "../middleware/app-error.js";

import logger from "../logger/index.js";
import utils from "../utils/index.js";
;



export const createProjectService = async (
  project: ICreateProjectRequestDto,
  userId:number
): Promise<ICreateProjectResponseDto> => {

  if (!project.name || !project.description) {
    throw new AppError(
      FILE_CONSTANTS.MESSAGES.PROJECT.NAME_DESCRIPTION_REQUIRED,
      FILE_CONSTANTS.HTTP_STATUS.BAD_REQUEST
    );
  }

  const newProject = await model.Project.create({
    user_id:userId,
    name: project.name,
    description: project.description,
  });

  const response: ICreateProjectResponseDto = {
    message: FILE_CONSTANTS.MESSAGES.PROJECT.CREATE_SUCCESS,
    result: {
      id: newProject.id,
      name: newProject.name,
      description: newProject.description,
      files_count: newProject.files_count,
      jobs_count: newProject.jobs_count,
      createdAt: newProject.createdAt,
      updatedAt: newProject.updatedAt,
    }
  };

  logger.projectLogger.created(newProject.id);

  return response;
};



export const getAllProjectsService = async (): Promise<IGetAllProjectsResponseDto> => {

  const projects = await model.Project.findAll();

  const projectCount = await model.Project.count();

  const response: IGetAllProjectsResponseDto = {
    message: FILE_CONSTANTS.MESSAGES.PROJECT.FETCH_ALL_SUCCESS,
    result: projects
  };

  logger.projectLogger.fetchedAll(projectCount);

  return response;
};



export const getProjectByIdService = async (
  projectId: number
): Promise<IGetProjectResponseDto> => {

  utils.idValidators.validateProjectId(projectId);

  const project = await model.Project.findByPk(projectId);

  if (!project) {
    throw new AppError(
      FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
      FILE_CONSTANTS.HTTP_STATUS.NOT_FOUND
    );
  }

  const response: IGetProjectResponseDto = {
    message: FILE_CONSTANTS.MESSAGES.PROJECT.FETCH_SUCCESS,
    result: {
      id: project.id,
      name: project.name,
      description: project.description,
      files_count: project.files_count,
      jobs_count: project.jobs_count,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }
  };
  logger.projectLogger.fetched(projectId);
  return response;
};



export const updateProjectService = async (
  projectId: number,
  projectInfo: IUpdateProjectRequestDto
): Promise<IUpdateProjectResponseDto> => {

  utils.idValidators.validateProjectId(projectId);
  if (!projectInfo.name || !projectInfo.description) {
    throw new AppError(
      FILE_CONSTANTS.MESSAGES.PROJECT.NAME_DESCRIPTION_REQUIRED,
      FILE_CONSTANTS.HTTP_STATUS.BAD_REQUEST
    );
  }

  const project = await model.Project.findByPk(projectId);

  if (!project) {
    throw new AppError(
      FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
      FILE_CONSTANTS.HTTP_STATUS.NOT_FOUND
    );
  }


  await project.update({
    name: projectInfo.name,
    description: projectInfo.description,
    updatedAt: new Date()
  });

  const response: IUpdateProjectResponseDto = {
    message: FILE_CONSTANTS.MESSAGES.PROJECT.UPDATE_SUCCESS,
    result: {
      id: project.id,
      name: projectInfo.name,
      description: projectInfo.description,
      files_count: project.files_count,
      jobs_count: project.jobs_count,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }
  };

  logger.projectLogger.updated(projectId);

  return response;
};



export const deleteProjectService = async (
  projectId: number
): Promise<IDeleteProjectResponseDto> => {

  utils.idValidators.validateProjectId(projectId);
  const project = await model.Project.findByPk(projectId);

  if (!project) {
    throw new AppError(
      FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
      FILE_CONSTANTS.HTTP_STATUS.NOT_FOUND
    );
  }

  await model.Job.destroy({
    where: {
      project_id: projectId
    }
  });

  await model.File.destroy({
    where: {
      project_id: projectId
    }
  });

  await project.destroy();

  const response: IDeleteProjectResponseDto = {
    message: FILE_CONSTANTS.MESSAGES.PROJECT.DELETE_SUCCESS
  };


  logger.projectLogger.deleted(projectId);
  return response;
};