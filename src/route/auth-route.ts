import { Router } from "express";

import controller from "../controller/index.js";

const router = Router();

router.post(
  "/login",
  controller.AuthController.login
);

export default router;