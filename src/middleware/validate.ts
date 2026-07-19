import type { NextFunction, Request, Response } from "express";

import type { ValidationSchema } from "../dto/validator/validator-dto.js";

import { AppError } from "./app-error.js";



/**
 * Validates request body, params, query and headers.
 *
 * @param schema - Zod validation schemas.
 * @returns Express middleware.
 */
const validate =
  (schema: ValidationSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
      const sections = [
        "body",
        "params",
      ] as const;

      for (const section of sections) {
        const validator = schema[section];

        if (!validator) {
          continue;
        }

        const result = validator.safeParse(req[section]);

        if (!result.success) {
          return next(
            new AppError(
              result.error.issues.map((issue) => issue.message).join(", "),
              400
            )
          );
        }

        req[section] = result.data;
      }

      next();
    };

export default validate;