import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Service = sequelize.define("Service",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  name:DataTypes.STRING,
  description:DataTypes.TEXT,
  price:DataTypes.DECIMAL,
  duration_minutes:DataTypes.INTEGER,
  target_species:DataTypes.STRING,
  is_active:DataTypes.BOOLEAN,
  image_url:DataTypes.TEXT
},{
  tableName:"services",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:false
});

export default Service;