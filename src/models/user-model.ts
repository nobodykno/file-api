import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import { IUserAttributes } from "../types/user-type.js";



class User extends Model<IUserAttributes> implements IUserAttributes {

  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;

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