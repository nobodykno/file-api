import { Router } from "express";

import controller from "../controller/index.js";


import middleware from "../middleware/index.js";

import schema from "../validators/index.js";

const router = Router();

// All project routes are protected
router.post(
  "/",
  middleware.authToken,
  middleware.validate(schema.projectValidator.createProjectSchema),
  controller.ProjectController.createProject
);

router.get(
  "/",
  middleware.authToken,
  controller.ProjectController.getAllProjects
);

router.get(
  "/:projectId",
  middleware.authToken,
  middleware.authenticateUser,
  middleware.validate(schema.projectValidator.getProjectByIdSchema),
  controller.ProjectController.getProjectById
);

router.patch(
  "/:projectId",
  middleware.authToken,
  middleware.authenticateUser,
  middleware.validate(schema.projectValidator.updateProjectSchema),
  controller.ProjectController.updateProject
);

router.delete(
  "/:projectId",
  middleware.authToken,
  middleware.authenticateUser,
  middleware.validate(schema.projectValidator.deleteProjectSchema),
  controller.ProjectController.deleteProject
);

export default router;