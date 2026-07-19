import { z } from "zod";

/**
 * Validates login request.
 */
 const loginSchema = {
  body: z
    .object({
      email: z
        .string()
        .trim()
        .email("Please provide a valid email address."),

      password: z
        .string()
        .min(5, "Password must be at least 5 characters.")
        .max(100, "Password cannot exceed 100 characters."),
    })
    .strict(),
};


const createUserSchema = {
  body: z
    .object({

      name: z
      .string()
      .trim()
      .min(8, "Name must be at least 4 chracter.")
      .max(100, "Password cannot exceed 100 characters."),
      

      email: z
        .string()
        .trim()
        .email("Please provide a valid email address."),

      password: z
        .string()
        .min(5, "Password must be at least 5 characters.")
        .max(100, "Password cannot exceed 100 characters."),
    })
    .strict(),
};
const authValidator = {
    loginSchema,
    createUserSchema
};

export default authValidator;