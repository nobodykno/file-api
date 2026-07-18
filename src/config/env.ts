import dotenv from "dotenv";

const environment = process.env.NODE_ENV || "development";

dotenv.config({
  path: `.env-${environment}`,
});

console.log(`.mn jnjkRunning in ${process.env} mode`);

export default environment;