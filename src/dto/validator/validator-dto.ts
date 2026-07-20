import type { z } from 'zod';


export interface ValidationSchema {
  body?: z.ZodObject;
  params?: z.ZodObject
}