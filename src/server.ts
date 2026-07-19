import "./config/env.js";
import middleware from "./middleware/index.js";

middleware.validateEnv();

import app from "./app.js";
import sequelize from "./config/database.js";



const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {

    // Step 1 — Connect to database
    await sequelize.authenticate();

    console.log("✅ Database connected");

    // Step 3 — Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });


  } catch (error) {

    console.error("❌ Server startup failed:", error);

    process.exit(1);
  }

  console.log("After app.listen");
};


void startServer();