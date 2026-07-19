import { Router } from "express";

import controller from "../controller/index.js";
import verifyToken from "../middleware/auth-token.js";
import upload from "../middleware/uploader.js";
import middleware from "../middleware/index.js";
import schema from "../validators/index.js";
const router = Router({ mergeParams: true });

// Upload files
router.post(
  "/",
  verifyToken,
  middleware.authenticateUser,
  upload.array("files", 10),
  middleware.validate(schema.fileValidators.uploadFilesSchema),
  controller.FileController.uploadFiles
);

// Get all files of a project
router.get(
  "/",
  verifyToken,
  middleware.authenticateUser,
  middleware.validate(schema.fileValidators.getProjectFilesSchema),
  controller.FileController.getProjectFiles
);

// Delete a file
router.delete(
  "/:fileId",
  verifyToken,
  middleware.authenticateUser,
  middleware.validate(schema.fileValidators.deleteFileSchema),
  controller.FileController.deleteFile
);

export default router;