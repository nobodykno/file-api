import logger from "../config/logger.js";
import type { ILog } from "../dto/logs/logs-dto.js";


 const logError = (payload:ILog): void => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  logger.error(payload);
};

export default logError;
