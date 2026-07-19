import { z } from "zod";
import FILE_CONSTANTS from "../constants/index.js";

/**
 * Validates login request.
 */
 const loginSchema = {
  body: z
    .object({
      email: z.email({
        error:FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.INVALID_EMAIL("Email")
      }),
        

      password: z
        .string()
        .min(5, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MIN_LENGTH('Password', 5))
        .max(100, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MAX_LENGTH('Password', 100)),
    })
    .strict(),
};


const createUserSchema = {
  body: z
    .object({

      name: z
      .string()
      .trim()
      .min(8, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MIN_LENGTH('Name', 8))
      .max(100,  FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MAX_LENGTH('Password', 100)),
      

      email:z.email({
        error:FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.INVALID_EMAIL("Email")
      }),

      password: z
        .string()
        .min(5, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MIN_LENGTH('Password', 5))
        .max(100, FILE_CONSTANTS.MESSAGES.SCHEMA_VALIDATION.MAX_LENGTH('Password', 100))
    })
    .strict(),
};
const authValidator = {
    loginSchema,
    createUserSchema
};

export default authValidator;