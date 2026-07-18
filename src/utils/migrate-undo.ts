import "../config/env.js";

import migrator from "../config/migrator.js";
import FILE_CONSTANTS from "../constants/index.js";



async function undoMigration() {
  try {
    const migration = await migrator.down();

    if (migration) {
      console.log(`${FILE_CONSTANTS.MESSAGES.MIGRATIONS.ROLLED_BACK} ${migration}`);
    } else {
      console.log(FILE_CONSTANTS.MESSAGES.MIGRATIONS.NO_MIGRATIONS_ROLLED_BACK);
    }

  } catch (error) {
    console.error(error);
  }
}

undoMigration();