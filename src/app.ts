

import cors from "cors";
import express from "express";
import "./models/index.js";
import helmet from "helmet";


import mainRoute from "./route/main-route.js";

import middleware from "./middleware/index.js";


const app = express();


app.use(cors(middleware.corsOptions));

app.use(express.json());

app.use(
  helmet()
);

if (process.env.NODE_ENV !== "test") {
  app.use(middleware.globalRateLimiter);
}



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

app.use(middleware.globalErrorHandler);

export default app;