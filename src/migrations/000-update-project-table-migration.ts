import type { QueryInterface } from "sequelize";
import { DataTypes } from "sequelize";

export const up = async ({
    context: queryInterface,
  }: {
    context: QueryInterface;
  }): Promise<void> => 
    {
        await queryInterface.addColumn("projects", "user_id", {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "users",
              key: "id",
        },
          });
          
          await queryInterface.addIndex("projects", ["user_id"]);
    };