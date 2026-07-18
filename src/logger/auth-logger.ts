import middleware from "../middleware/index.js";



const authLogger = {
  login(email: string) {
    middleware.logSuccess({
      module: "Auth",
      action: "LOGIN",
      message: "User logged in successfully",
      data: {
        email,
      },
    });
  },
};

export default authLogger;