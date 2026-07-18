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
        .min(8, "Password must be at least 8 characters.")
        .max(100, "Password cannot exceed 100 characters."),
    })
    .strict(),
};

const authValidator = {
    loginSchema
};

export default authValidator;