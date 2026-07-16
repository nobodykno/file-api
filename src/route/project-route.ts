import { Router } from "express";

import controller from "../controller/index.js";
import verifyToken from "../middleware/auth.js";

const router = Router();

// All project routes are protected
router.post(
  "/",
  verifyToken,
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
  controller.ProjectController.getProjectById
);

router.patch(
  "/:projectId",
  verifyToken,
  controller.ProjectController.updateProject
);

router.delete(
  "/:projectId",
  verifyToken,
  controller.ProjectController.deleteProject
);

export default router;