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
 * Validates request body for creating a project.
 */
const createProjectSchema = {
  body: z
    .object({
      
     user_id:z.coerce
     .number()
     .int(FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.INVALID_NUMBER('UserId'))
     .positive(FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.POSITIVE_NUMBER('UserId')),

      name: z
        .string()
        .regex(FILE_CONSTANTS.MESSAGES.VALIDATION.ALLOWED_TEXT)
        .trim()
        .regex(FILE_CONSTANTS.MESSAGES.VALIDATION.ALLOWED_TEXT)
        .min(10, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MIN_LENGTH("Project name",10 ))
        .max(30, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MAX_LENGTH("Project name",30 )),
  

      description: z
        .string()
        .regex(FILE_CONSTANTS.MESSAGES.VALIDATION.ALLOWED_TEXT)
        .trim()
        .min(5, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MIN_LENGTH("Project description",10 ))
        .max(500, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MAX_LENGTH("Project description",500 )),
    })
    .strict(),
};

/**
 * Validates request for updating a project.
 */
const updateProjectSchema = {
  params: projectParamsSchema,

  body: z
    .object({
      name: z
      .string()
      .regex(FILE_CONSTANTS.MESSAGES.VALIDATION.ALLOWED_TEXT)
      .trim()
      .regex(FILE_CONSTANTS.MESSAGES.VALIDATION.ALLOWED_TEXT)
      .min(10, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MIN_LENGTH("Project name",10 ))
      .max(30, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MAX_LENGTH("Project name",30 )),

      description: z
        .string()
        .regex(FILE_CONSTANTS.MESSAGES.VALIDATION.ALLOWED_TEXT)
        .trim()
        .min(5, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MIN_LENGTH("Project description",10 ))
        .max(500, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MAX_LENGTH("Project description",500 )),
    })
    .strict(),
};

/**
 * Validates project id.
 */
const getProjectByIdSchema = {
  params: projectParamsSchema,
};

/**
 * Validates project id.
 */
const deleteProjectSchema = {
  params: projectParamsSchema,
};

const projectValidator = {
  deleteProjectSchema,
  getProjectByIdSchema,
  updateProjectSchema,
  createProjectSchema,
  projectParamsSchema
};

export default projectValidator;