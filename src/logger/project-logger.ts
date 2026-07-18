import { logSuccess } from "../middleware/success-logger.js";

 const  projectLogger = {
  created(projectId: number) {
    logSuccess({
      module: "Project",
      action: "CREATE",
      message: "Project created successfully",
      data: {
        projectId: projectId
      },
    });
  },

  updated(projectId: number) {
    logSuccess({
      module: "Project",
      action: "UPDATE",
      message: "Project updated successfully",
      data: {
        projectId: projectId
      },
    });
  },

  deleted(projectId: number) {
    logSuccess({
      module: "Project",
      action: "DELETE",
      message: "Project deleted successfully",
      data: {
        projectId:projectId,
      },
    });
  },

  fetched(projectId: number) {
    logSuccess({
      module: "Project",
      action: "GET",
      message: "Project fetched successfully",
      data: {
        projectId: projectId,
      },
    });
  },

  fetchedAll(count: number) {
    logSuccess({
      module: "Project",
      action: "GET_ALL",
      message: "Projects fetched successfully",
      data: {
        totalProjects: count,
      },
    });
  },
};


export default projectLogger