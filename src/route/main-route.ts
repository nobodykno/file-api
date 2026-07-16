import { Router } from "express";
import Route from "./index.js";

const router = Router();

router.use("/api", Route.AuthRoute);

router.use("/api/projects", Route.ProjectRoute);

router.use("/api/projects/:projectId/file", Route.FileRoute);

router.use("/api/projects/:projectId/jobs", Route.JobRoute);

export default router;