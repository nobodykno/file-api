import express from "express";
import cors from "cors";


import "./models/index.js";
import mainRoute from "./route/main-route.js";
import globalErrorHandler from "./middleware/global-error.js";
import morganMiddleware from "./config/morgan.js";

import helmet from "helmet";
// const require = createRequire(import.meta.url);
// const helmet = require("helmet");

const app = express();


app.use(cors());

app.use(express.json());

app.use(
  helmet()
);

app.use(morganMiddleware);

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