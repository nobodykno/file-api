import dotenv from "dotenv";

const environment = process.env.NODE_ENV || "development";

dotenv.config({
  path: `.env-${environment}`,
});

const requiredEnv = [
  "PORT",
  "DB_HOST",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
  "JWT_SECRET",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is missing.`);
  }
});

console.log(`Running in ${environment} mode`);

export default environment;