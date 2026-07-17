import * as auth from "./auth-service.js";
import * as project from "./project-service.js";
import * as file from "./file-service.js";
import * as job from "./job-service.js";

const service = {
  auth,
  project,
  file,
  job,
};

export default service;