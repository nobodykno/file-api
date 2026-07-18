import { Router } from "express";

import controller from "../controller/index.js";
import verifyToken from "../middleware/auth.js";

import middleware from "../middleware/index.js";

import schema from "../validators/index.js";
const router = Router();

// All project routes are protected
router.post(
  "/",
  verifyToken,
  middleware.validate(schema.projectValidator.createProjectSchema),
  controller.ProjectController.createProject
);

router.get(
  "/",
  verifyToken,
  controller.ProjectController.getAllProjects
);

router.get(
  "/:projectId",
  verifyToken,
  middleware.validate(schema.projectValidator.getProjectByIdSchema),
  controller.ProjectController.getProjectById
);

router.patch(
  "/:projectId",
  verifyToken,
  middleware.validate(schema.projectValidator.updateProjectSchema),
  controller.ProjectController.updateProject
);

router.delete(
  "/:projectId",
  verifyToken,
  middleware.validate(schema.projectValidator.deleteProjectSchema),
  controller.ProjectController.deleteProject
);

export default router;