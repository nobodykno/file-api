import type { 
  HasManyCountAssociationsMixin,
   HasManyCreateAssociationMixin, 
   HasManyGetAssociationsMixin} from "sequelize";
import { DataTypes, Model  } from "sequelize";

import sequelize from "../config/database.js";
import type { IProjectAttributes, IProjectCreationAttributes } from "../types/project-type.js";

import type File from "./file-model.js";
import type Job from "./job-model.js";




class Project extends Model<IProjectAttributes, IProjectCreationAttributes> implements IProjectAttributes {
  declare id: number;
  declare name: string;
  declare description: string;
  declare files_count: number;
  declare jobs_count: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare user_id: number;
   // File Association
  declare getFiles: HasManyGetAssociationsMixin<File>;
  declare countFiles: HasManyCountAssociationsMixin;
  declare createFile: HasManyCreateAssociationMixin<File>;
    // Job Association
  declare getJobs: HasManyGetAssociationsMixin<Job>;
  declare countJobs: HasManyCountAssociationsMixin;
  declare createJob: HasManyCreateAssociationMixin<Job>;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
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