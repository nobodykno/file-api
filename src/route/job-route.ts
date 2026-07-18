import { Router } from "express";

import controller from "../controller/index.js";
import verifyToken from "../middleware/auth.js";
import schema from "../validators/index.js";
import middleware from "../middleware/index.js";
const router = Router({ mergeParams: true });

// All job routes are protected
router.post(
  "/",
  verifyToken,
  middleware.validate(schema.jobValidator.createJobSchema),
  controller.JobController.createJob
);

router.get(
  "/",
  verifyToken,
  middleware.validate(schema.jobValidator.getAllJobsSchema),
  controller.JobController.getAllJobs
);

router.get(
  "/:jobId",
  verifyToken,
  middleware.validate(schema.jobValidator.getJobStatusSchema),
  controller.JobController.getJobStatus
);

router.get(
  "/:jobId/download",
  verifyToken,
  middleware.validate(schema.jobValidator.downloadOutputSchema),
  controller.JobController.downloadOutput
);

export default router;