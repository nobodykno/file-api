import FILE_CONSTANTS from "../constants/index.js";
import { AppError } from "../middleware/app-error.js";

/**
 * Ensures a project ID is provided.
 */
 const validateProjectId = (projectId?: number): void => {
  if (!projectId) {
    throw new AppError(
      FILE_CONSTANTS.MESSAGES.PROJECT.PROJECT_ID_NOT_FOUND,
      400
    );
  }
};

/**
 * Ensures a job ID is provided.
 */
 const validateJobId = (jobId?: number): void => {
  if (!jobId) {
    throw new AppError(
      FILE_CONSTANTS.MESSAGES.JOB.JOB_ID_NOT_FOUND,
      400
    );
  }
};
/**
 * Ensures a file ID is provided.
 */

 const validateFileId = (fileId?: number): void => {
    if (!fileId) {
      throw new AppError(
        FILE_CONSTANTS.MESSAGES.FILE.FILE_ID_NOT_FOUND,
        400
      );
    }
  };

  const idValidators = {
    validateFileId,
    validateJobId,
    validateProjectId
  };

  export default idValidators;