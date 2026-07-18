

import cors from "cors";
import express from "express";
import "./models/index.js";
import helmet from "helmet";

import morganMiddleware from "./config/morgan.js";
import corsOptions from "./middleware/cors.js";
import globalErrorHandler from "./middleware/global-error.js";
import globalLimiter from "./middleware/rate-limiter.js";
import mainRoute from "./route/main-route.js";


const app = express();


app.use(cors(corsOptions));

app.use(express.json());

app.use(
  helmet()
);

app.use(morganMiddleware);

app.use(globalLimiter)

// Routes
app.use("/v1", mainRoute);


// Logger middleware
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});


app.get("/", (req, res) => {
  res.json({
    message: "File API"
  });
});

app.use(globalErrorHandler)

export default app;