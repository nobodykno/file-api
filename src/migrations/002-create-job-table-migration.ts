import { DataTypes, QueryInterface } from "sequelize";

export const up = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}): Promise<void> => {
  await queryInterface.createTable("jobs", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PROCESSING",
        "COMPLETED",
        "FAILED"
      ),
      defaultValue: "PENDING",
      allowNull: false,
    },

    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    fileIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
      allowNull: false,
    },

    outputPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};



export const down = async (
  { context: queryInterface }: { context: QueryInterface }
): Promise<void> => {
  await queryInterface.dropTable("jobs");
};