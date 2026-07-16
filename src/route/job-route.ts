import { Router } from "express";

import controller from "../controller/index.js";
import verifyToken from "../middleware/auth.js";

const router = Router({ mergeParams: true });

// All job routes are protected
router.post(
  "/",
  verifyToken,
  controller.JobController.createJob
);

router.get(
  "/",
  verifyToken,
  controller.JobController.getAllJobs
);

router.get(
  "/:jobId",
  verifyToken,
  controller.JobController.getJobStatus
);

router.get(
  "/:jobId/download",
  verifyToken,
  controller.JobController.downloadOutput
);

export default router;