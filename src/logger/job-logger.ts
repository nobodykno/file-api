import FILE_CONSTANTS from "../constants/index.js";
import middleware from "../middleware/index.js";
import logger from "./index.js";

 const jobLogger = {
    created(jobId: number) {
      middleware.logSuccess({
        module: FILE_CONSTANTS.MESSAGES.MODULE.JOBS,
        action: FILE_CONSTANTS.MESSAGES.ACTION.CREATE,
        message: FILE_CONSTANTS.MESSAGES.JOB.FETCH_SUCCESS,
        data: {
          jobId,
        },
      });
    },

    getStatus(jobId: number) {
      middleware.logSuccess({
        module: FILE_CONSTANTS.MESSAGES.MODULE.JOBS,
        action: FILE_CONSTANTS.MESSAGES.ACTION.GET,
        message: FILE_CONSTANTS.MESSAGES.JOB.GET_STATUS,
        data: {
          jobId,
        },
      });
    },
  
    completed(jobId: number) {
      middleware.logSuccess({
        module: FILE_CONSTANTS.MESSAGES.MODULE.JOBS,
        action: FILE_CONSTANTS.MESSAGES.ACTION.COMPLETE,
        message: FILE_CONSTANTS.MESSAGES.JOB.COMPLETE_STATUS,
        data: {
            jobId,
        },
      });
    },
    
    downloaded(jobId: number) {
      middleware.logSuccess({
        module: FILE_CONSTANTS.MESSAGES.MODULE.JOBS,
        action: FILE_CONSTANTS.MESSAGES.ACTION.DOWNLOAD,
        message: FILE_CONSTANTS.MESSAGES.JOB.DOWNLOAD_SUCCESS,
        data: {
            jobId,
        },
      });
    },
  
    fetched(projectId: number) {
      middleware.logSuccess({
        module:  FILE_CONSTANTS.MESSAGES.MODULE.JOBS,
        action:  FILE_CONSTANTS.MESSAGES.ACTION.GET,
        message: FILE_CONSTANTS.MESSAGES.JOB.FETCH_SUCCESS,
        data: {
          projectId,
        },
      });
    },
  
    fetchedAll(count: number) {
      middleware.logSuccess({
        module: FILE_CONSTANTS.MESSAGES.MODULE.JOBS,
        action: FILE_CONSTANTS.MESSAGES.ACTION.GET,
        message: FILE_CONSTANTS.MESSAGES.JOB.FETCH_ALL_JOBS,
        data: {
          totalJobs: count,
        },
      });
    },

    errorZip(jobId: number, error:unknown) {
      logger.logError({
        module: FILE_CONSTANTS.MESSAGES.MODULE.JOBS,
        action: FILE_CONSTANTS.MESSAGES.ACTION.CREATE_ZIP,
        message: FILE_CONSTANTS.MESSAGES.JOB.FAILED_CREATE_ZIP,
        data: {
          jobId,
          error
        },
      });
    }
  
  };

  export default jobLogger;