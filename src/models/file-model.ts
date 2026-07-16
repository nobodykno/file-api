
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { IFileAttributes } from "../types/file-type.js";



class File extends Model<IFileAttributes> implements IFileAttributes {
  declare id: number;
  declare project_id: number | null;
  declare name: string;
  declare file_name: string;
  declare size: number;
  declare mime_type: string | null;
  declare path: string | null;
  declare uploaded_at: Date;
}

File.init(
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
      allowNull: true,
    },

    path: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    uploaded_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "files",
    timestamps: false,
  }
);

export default File;