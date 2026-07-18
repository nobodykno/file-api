import morgan from "morgan";
import logger from "./logger.js";

const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

const morganMiddleware =
  process.env.NODE_ENV === "development"
    ? morgan("dev")
    : morgan(":method :url :status :response-time ms", {
        stream,
      });

export default morganMiddleware;