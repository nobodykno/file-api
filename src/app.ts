import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./models/index.js";
import mainRoute from "./route/main-route.js";

dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());


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


export default app;