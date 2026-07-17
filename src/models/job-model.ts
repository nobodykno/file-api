import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { IJobAttributes } from "../types/job-type.js";
import { ICreateJobRequestDto } from "../dto/request/job-request-dto.js";


class Job extends Model<IJobAttributes, ICreateJobRequestDto> implements IJobAttributes {
  declare id: number;
  declare project_id: number | 0;
  declare status: string;
  declare progress: number;
  declare outputPath: string | null;
  declare completedAt: Date | null;
  declare fileIds: number[];
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    project_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "projects",
        key: "id",
      },
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "PENDING",
    },

    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    fileIds: {
      type: DataTypes.ARRAY,
      defaultValue: [],
    },

    outputPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "jobs"
  }
);

export default Job;