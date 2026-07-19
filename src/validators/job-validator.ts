import { z } from "zod";
import FILE_CONSTANTS from "../constants/index.js";

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
 * Validates project and job route parameters.
 */
 const jobParamsSchema = z.object({
  projectId: z.coerce
    .number()
    .int("Project ID must be an integer.")
    .positive("Project ID must be greater than zero."),

  jobId: z.coerce
    .number()
    .int("Job ID must be an integer.")
    .positive("Job ID must be greater than zero."),
});

/**
 * Validates request body for creating a job.
 */
 const createJobSchema = {
  params: projectParamsSchema,

  body: z
    .object({
      fileIds: z
        .array(
          z.coerce
            .number()
            .int(FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.INVALID_NUMBER('FileId'))
            .positive(FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.POSITIVE_NUMBER('FileId'))
        )
        .min(1, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MIN_FILE(1)),
    })
    .strict(),
};

/**
 * Validates request for fetching all project jobs.
 */
 const getAllJobsSchema = {
  params: projectParamsSchema,
};

/**
 * Validates request for fetching a job status.
 */
 const getJobStatusSchema = {
  params: jobParamsSchema,
};

/**
 * Validates request for downloading job output.
 */
 const downloadOutputSchema = {
  params: jobParamsSchema,
};

/**
 * Validates request for fetching a job status.
 */

  const getJobDetailsSchema = {
  params: jobParamsSchema,
};

const jobValidator = {
    downloadOutputSchema,
    getJobStatusSchema,
    getAllJobsSchema,
    createJobSchema,
    projectParamsSchema,
    jobParamsSchema,
    getJobDetailsSchema

};

export default jobValidator;