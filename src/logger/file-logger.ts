import FILE_CONSTANTS from "../constants/index.js";
import middleware from "../middleware/index.js";


 const fileLogger = {
  uploaded(projectId: number, totalFiles: number) {
    middleware.logSuccess({
      module: FILE_CONSTANTS.MESSAGES.MODULE.FILE,
      action: FILE_CONSTANTS.MESSAGES.ACTION.UPLOAD,
      message: FILE_CONSTANTS.MESSAGES.FILE.UPLOAD_SUCCESS,
      data: {
        projectId,
        totalFiles,
      },
    });
  },

  deleted(projectId: number, fileId: number) {
    middleware.logSuccess({
      module: FILE_CONSTANTS.MESSAGES.MODULE.FILE,
      action: FILE_CONSTANTS.MESSAGES.ACTION.CREATE,
      message: FILE_CONSTANTS.MESSAGES.FILE.DELETE_SUCCESS,
      data: {
        projectId,
        fileId,
      },
    });
  },

  fetched(projectId: number, count: number) {
    middleware.logSuccess({
      module: FILE_CONSTANTS.MESSAGES.MODULE.FILE,
      action: FILE_CONSTANTS.MESSAGES.ACTION.GET,
      message: FILE_CONSTANTS.MESSAGES.FILE.FETCH_SUCCESS,
      data: {
        projectId,
        totalFiles: count,
      },
    });
  },
};




export default fileLogger;


