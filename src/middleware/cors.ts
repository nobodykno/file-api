import type cors from "cors";

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") ?? [];

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    // Allow Postman and server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Origin not allowed by CORS"));
  },

  credentials: true,
};

export default corsOptions;