import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  email:{type:DataTypes.STRING,unique:true,allowNull:false},
  password_hash:{type:DataTypes.STRING,allowNull:false},
  full_name:{type:DataTypes.STRING,allowNull:false},
  phone_number:DataTypes.STRING,
  avatar_url:DataTypes.TEXT,
  address:DataTypes.TEXT,
  role:{type:DataTypes.ENUM("customer","admin","staff"),defaultValue:"customer"},
  is_active:{type:DataTypes.BOOLEAN,defaultValue:true}
},{
  tableName:"users",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:"updated_at"
});

export default User;