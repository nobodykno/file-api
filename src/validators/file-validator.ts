import { z } from "zod";
import FILE_CONSTANTS from "../constants/index.js";

/**
 * Validates project route parameters.
 */
 const projectParamsSchema = z.object({
  projectId: z.coerce
    .number()
    .int(FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.INVALID_NUMBER('ProjectId'))
    .positive(FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.POSITIVE_NUMBER('ProjectId'))
});

/**
 * Validates file route parameters.
 */
const fileParamsSchema = z.object({
  projectId: z.coerce
    .number()
    .int(FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.INVALID_NUMBER('ProjectId'))
    .positive(FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.POSITIVE_NUMBER('ProjectId')),

  fileId: z.coerce
    .number()
    .int(FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.INVALID_NUMBER('FileId'))
    .positive(FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.POSITIVE_NUMBER('FileId'))
});

/**
 * Validates upload file request.
 *
 * Note:
 * Multer handles file validation.
 * This schema validates only the route parameters.
 */
 const uploadFilesSchema = {
  params: projectParamsSchema,
};

/**
 * Validates request for fetching project files.
 */
const getProjectFilesSchema = {
  params: projectParamsSchema,
};

/**
 * Validates request for deleting a file.
 */
 const deleteFileSchema = {
  params: fileParamsSchema,
};


const  fileValidators = {
    fileParamsSchema,
    projectParamsSchema,
    uploadFilesSchema,
    getProjectFilesSchema,
    deleteFileSchema

};

export default fileValidators;