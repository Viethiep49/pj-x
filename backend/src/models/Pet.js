import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Pet = sequelize.define("Pet",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  owner_id:{type:DataTypes.UUID,allowNull:false},
  breed_id:DataTypes.UUID,
  name:{type:DataTypes.STRING,allowNull:false},
  species:{type:DataTypes.ENUM("dog","cat"),allowNull:false},
  breed:DataTypes.STRING,
  fur_length:DataTypes.STRING,
  weight:DataTypes.DECIMAL,
  gender:DataTypes.STRING,
  age:DataTypes.INTEGER,
  image_url:DataTypes.TEXT,
  medical_history:DataTypes.TEXT
},{
  tableName:"pets",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:"updated_at"
});

export default Pet;