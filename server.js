const app = require('./src/app');
const sequelize = require('./src/config/database');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {

    // Step 1 — Connect to database
    await sequelize.authenticate();
  

    // Step 2 — Sync models
    await sequelize.sync({ alter: true });
  

    // Step 3 — Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (err) {
    process.exit(1);
  }
};

startServer();