import FILE_CONSTANTS from "../constants/index.js";
import middleware from "../middleware/index.js";



const authLogger = {
  login(email: string) {
    middleware.logSuccess({
      module: FILE_CONSTANTS.MESSAGES.MODULE.AUTH,
      action: FILE_CONSTANTS.MESSAGES.ACTION.REGISTER,
      message: FILE_CONSTANTS.MESSAGES.AUTH.LOGIN_SUCCESS,
      data: {
        email,
      },
    });
  },

  register(email:string ) {
    middleware.logSuccess({
      module: FILE_CONSTANTS.MESSAGES.MODULE.AUTH,
      action: FILE_CONSTANTS.MESSAGES.ACTION.LOGIN,
      message: FILE_CONSTANTS.MESSAGES.AUTH.USER_REGISTERED,
      data: {
        email,
      },
    });
  },
};



export default authLogger;