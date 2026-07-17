import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { IProjectAttributes, IProjectCreationAttributes } from "../types/project-type.js";




class Project extends Model<IProjectAttributes, IProjectCreationAttributes> implements IProjectAttributes {
  declare id: number;
  declare name: string;
  declare description: string;
  declare files_count: number;
  declare jobs_count: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    files_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    jobs_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "projects",
    timestamps: false,
  }
);

export default Project;