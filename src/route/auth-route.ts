import { Router } from "express";

import controller from "../controller/index.js";
import middleware from "../middleware/index.js";
import schema from "../validators/index.js";

const router = Router();

router.post(
  "/login",
middleware.validate(schema.authValidator.loginSchema),
  controller.AuthController.login
);

router.post(
  "/register",
  middleware.validate(schema.authValidator.createUserSchema),
  controller.AuthController.createUser
);

export default router;