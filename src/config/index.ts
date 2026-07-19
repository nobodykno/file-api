import sequelize from "./database.js";
import logger from "./logger.js";
import migrator from "./migrator.js";
import validateEnv from "./validate-env.js";
import environment from "./env.js";

const config = {
    sequelize,
    logger,
    migrator,
    validateEnv,
    environment
};

export default config;
