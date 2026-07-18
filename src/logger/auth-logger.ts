import { logSuccess } from "../middleware/success-logger.js";



const authLogger = {
  login(email: string) {
    logSuccess({
      module: "Auth",
      action: "LOGIN",
      message: "User logged in successfully",
      data: {
        email: email,
      },
    });
  },
};

export default authLogger;