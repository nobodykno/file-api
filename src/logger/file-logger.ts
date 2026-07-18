import { logSuccess } from "../middleware/success-logger.js";

 
 const fileLogger = {
  uploaded(projectId: number, totalFiles: number) {
    logSuccess({
      module: "File",
      action: "UPLOAD",
      message: "Files uploaded successfully",
      data: {
        projectId,
        totalFiles,
      },
    });
  },

  deleted(projectId: number, fileId: number) {
    logSuccess({
      module: "File",
      action: "DELETE",
      message: "File deleted successfully",
      data: {
        projectId,
        fileId,
      },
    });
  },

  fetched(projectId: number, count: number) {
    logSuccess({
      module: "File",
      action: "GET",
      message: "Files fetched successfully",
      data: {
        projectId,
        totalFiles: count,
      },
    });
  },
};


export default fileLogger;


