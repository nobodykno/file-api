import { DataTypes,  QueryInterface } from "sequelize";

export const up = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}): Promise<void> => {
  await queryInterface.createTable("files", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    file_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    mime_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    path: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    uploadedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};




export const down = async (
  { context: queryInterface }: { context: QueryInterface }
): Promise<void> => {
  await queryInterface.dropTable("files");
};