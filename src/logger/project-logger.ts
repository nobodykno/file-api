import FILE_CONSTANTS from "../constants/index.js";
import middleware from "../middleware/index.js";

 const  projectLogger = {
  created(projectId: number) {
    middleware.logSuccess({
      module: FILE_CONSTANTS.MESSAGES.MODULE.PROJECT,
      action: FILE_CONSTANTS.MESSAGES.ACTION.CREATE,
      message: FILE_CONSTANTS.MESSAGES.PROJECT.CREATE_SUCCESS,
      data: {
        projectId
      },
    });
  },

  updated(projectId: number) {
    middleware.logSuccess({
      module: FILE_CONSTANTS.MESSAGES.MODULE.PROJECT,
      action: FILE_CONSTANTS.MESSAGES.ACTION.UPDATE,
      message: FILE_CONSTANTS.MESSAGES.PROJECT.UPDATE_SUCCESS,
      data: {
        projectId
      },
    });
  },

  deleted(projectId: number) {
    middleware.logSuccess({
      module: FILE_CONSTANTS.MESSAGES.MODULE.PROJECT,
      action: FILE_CONSTANTS.MESSAGES.ACTION.DELETE,
      message: FILE_CONSTANTS.MESSAGES.PROJECT.DELETE_SUCCESS,
      data: {
        projectId,
      },
    });
  },

  fetched(projectId: number) {
    middleware.logSuccess({
      module: FILE_CONSTANTS.MESSAGES.MODULE.PROJECT,
      action: FILE_CONSTANTS.MESSAGES.ACTION.GET,
      message: FILE_CONSTANTS.MESSAGES.PROJECT.FETCH_SUCCESS,
      data: {
        projectId,
      },
    });
  },

  fetchedAll(count: number) {
    middleware.logSuccess({
      module: FILE_CONSTANTS.MESSAGES.MODULE.PROJECT,
      action: FILE_CONSTANTS.MESSAGES.ACTION.GET,
      message: FILE_CONSTANTS.MESSAGES.PROJECT.FETCH_ALL_SUCCESS,
      data: {
        totalProjects: count,
      },
    });
  },
};


export default projectLogger;