import { z } from "zod";

/**
 * Validates project route parameters.
 */
 const projectParamsSchema = z.object({
  projectId: z.coerce
    .number()
    .int("Project ID must be an integer.")
    .positive("Project ID must be greater than zero."),
});

/**
 * Validates file route parameters.
 */
const fileParamsSchema = z.object({
  projectId: z.coerce
    .number()
    .int("Project ID must be an integer.")
    .positive("Project ID must be greater than zero."),

  fileId: z.coerce
    .number()
    .int("File ID must be an integer.")
    .positive("File ID must be greater than zero."),
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