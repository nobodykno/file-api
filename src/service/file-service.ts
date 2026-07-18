import fs from "fs";

import model from "../models/index.js";
import FILE_CONSTANTS from "../constants/index.js";



import {
  IFileDto,
  IGetProjectFilesResponseDto,
  IUploadFileResponseDto,
} from "../dto/response/file-response-dto.js";
import { AppError } from "../middleware/app-error.js";

/**
 * Uploads one or more files to a project.
 *
 * Creates file records in the database, updates the project's
 * file count, and returns the uploaded file details.
 *
 * @param projectId Project identifier.
 * @param files Uploaded multer files.
 * @returns Uploaded file details.
 */
export const uploadFilesService = async (
    projectId: number,
    files: Express.Multer.File[]
  ): Promise<IUploadFileResponseDto> => {
  
    const project = await model.Project.findByPk(projectId);
  
    if (!project) {
      throw new AppError(
        FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
        FILE_CONSTANTS.HTTP_STATUS.NOT_FOUND
      );
    }
  
    if (!files || files.length === 0) {
      throw new AppError(
        FILE_CONSTANTS.MESSAGES.FILE.NO_FILES_UPLOADED,
        FILE_CONSTANTS.HTTP_STATUS.BAD_REQUEST
      );
    }
  
    const uploadedFiles = files.map(file => ({
      project_id: projectId,
      name: file.originalname,
      file_name: file.filename,
      size: file.size,
      mime_type: file.mimetype,
      path: file.path,
    }));
  
    const createdFiles = await model.File.bulkCreate(uploadedFiles);
  
    const fileCount = await model.File.count({
      where: {
        project_id: projectId
      }
    });
  
    await project.update({
      files_count: fileCount
    });
  
    const response: IUploadFileResponseDto = {
      message: FILE_CONSTANTS.MESSAGES.FILE.UPLOAD_SUCCESS,
      result: createdFiles.map(file => ({
        id: file.id,
        project_id: file.project_id,
        name: file.name,
        file_name: file.file_name,
        size: file.size,
        mime_type: file.mime_type,
        path: file.path,
        uploadedAt: file.uploadedAt
      }))
    };
  
    return response;
  };

  /**
 * Fetches all files associated with a project.
 *
 * Validates whether the project exists and returns
 * all uploaded files for the given project.
 *
 * @param projectId Project identifier.
 * @returns List of project files.
 */
export const getProjectFilesService = async (
    projectId: number
  ): Promise<IGetProjectFilesResponseDto> => {
  
    const project = await model.Project.findByPk(projectId);

    const fileCount = await model.File.count({
        where: {
          project_id: projectId
        }
      });
  
    if (!project) {
      throw new AppError(
        FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
        FILE_CONSTANTS.HTTP_STATUS.NOT_FOUND
      );
    }
  
    const files = await model.File.findAll({
      where: {
        project_id: projectId
      },
      order: [["uploadedAt", "DESC"]]
    });
  
    const response: IGetProjectFilesResponseDto = {
      message: FILE_CONSTANTS.MESSAGES.FILE.FETCH_SUCCESS,
      count: files.length,
  
      result: files.map(file => ({
        id: file.id,
        project_id: file.project_id,
        name: file.name,
        file_name: file.file_name,
        size: file.size,
        mime_type: file.mime_type,
        path: file.path,
        uploadedAt: file.uploadedAt
      }))
    };
  
    return response;
  };


  /**
 * Deletes a file from the project.
 *
 * Removes the file record from the database,
 * updates the project's file count,
 * and deletes the physical file from disk.
 *
 * @param projectId Project identifier.
 * @param fileId File identifier.
 * @returns Success response.
 */
export const deleteFileService = async (
    projectId: number,
    fileId: number
  ): Promise<{ message: string }> => {
  
    const project = await model.Project.findByPk(projectId);
  
    if (!project) {
      throw new AppError(
        FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_NOT_FOUND,
        FILE_CONSTANTS.HTTP_STATUS.NOT_FOUND
      );
    }
  
    const file = await model.File.findOne({
      where: {
        id: fileId,
        project_id: projectId
      }
    });
  
    if (!file) {
      throw new AppError(
        FILE_CONSTANTS.MESSAGES.FILE.FILE_NOT_FOUND,
        FILE_CONSTANTS.HTTP_STATUS.NOT_FOUND
      );
    }
  
    await file.destroy();
  
    const fileCount = await model.File.count({
      where: {
        project_id: projectId
      }
    });
  
    await project.update({
      files_count: fileCount
    });
  
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  
    return {
      message: FILE_CONSTANTS.MESSAGES.FILE.DELETE_SUCCESS
    };
  };