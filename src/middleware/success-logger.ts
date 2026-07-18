import logger from "../config/logger.js";
import { SuccessLog } from "../dto/logs/logs-dto.js";


export const logSuccess = (payload:SuccessLog): void => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  logger.info(payload);
};