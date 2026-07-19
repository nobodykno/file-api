import type { HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin} from "sequelize";
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import type { ICreateUserRequestDto, IUserAttributes } from "../types/user-type.js";
import type Project from "./project-model.js";



class User extends Model<IUserAttributes, ICreateUserRequestDto> implements IUserAttributes {

  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;

  declare getProjects: HasManyGetAssociationsMixin<Project>;

declare countProjects: HasManyCountAssociationsMixin;

declare createProject: HasManyCreateAssociationMixin<Project>;

}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "users"
  }
);


export default User;