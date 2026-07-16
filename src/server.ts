import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {

    // Step 1 — Connect to database
    await sequelize.authenticate();

    console.log("✅ Database connected");


    // Step 2 — Sync models
    await sequelize.sync({
      alter: true
    });

    console.log("✅ Database synced");


    // Step 3 — Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });


  } catch (error) {

    console.error("❌ Server startup failed:", error);

    process.exit(1);
  }
};


startServer();