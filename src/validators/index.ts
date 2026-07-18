import authValidator from "./auth-validator.js";
import fileValidators from "./file-validator.js";
import jobValidator from "./job-validator.js";
import projectValidator from "./project-validator.js";

const schema = {

    fileValidators,
    projectValidator,
    jobValidator,
    authValidator
};

export default schema;
