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
            .int("File ID must be an integer.")
            .positive("File ID must be greater than zero.")
        )
        .min(1, "At least one file must be selected."),
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