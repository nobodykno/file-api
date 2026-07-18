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
 * Validates request body for creating a project.
 */
const createProjectSchema = {
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(3, "Project name must be at least 3 characters.")
        .max(100, "Project name cannot exceed 100 characters."),

      description: z
        .string()
        .trim()
        .min(5, "Description must be at least 5 characters.")
        .max(500, "Description cannot exceed 500 characters."),
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
        .trim()
        .min(3)
        .max(100)
        .optional(),

      description: z
        .string()
        .trim()
        .min(5)
        .max(500)
        .optional(),
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