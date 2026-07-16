import { Router } from "express";

import controller from "../controller/index.js";
import verifyToken from "../middleware/auth.js";
import upload from "../middleware/uploader.js";

const router = Router({ mergeParams: true });

// Upload files
router.post(
  "/",
  verifyToken,
  upload.array("files", 10),
  controller.FileController.uploadFiles
);

// Get all files of a project
router.get(
  "/",
  verifyToken,
  controller.FileController.getProjectFiles
);

// Delete a file
router.delete(
  "/:fileId",
  verifyToken,
  controller.FileController.deleteFile
);

export default router;