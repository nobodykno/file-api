import type { ZodTypeAny } from "zod";


export interface ValidationSchema {
    body?: ZodTypeAny;
    params?: ZodTypeAny;
    query?: ZodTypeAny;
    headers?: ZodTypeAny;
  }