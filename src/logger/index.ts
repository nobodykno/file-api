import  authLogger  from './auth-logger.js';
import fileLogger from './file-logger.js';
import jobLogger from './job-logger.js';
import projectLogger from './project-logger.js';

 const logger =  {

    projectLogger,
    jobLogger,
    fileLogger,
    authLogger
};

export default logger;