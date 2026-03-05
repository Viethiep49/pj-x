import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductCategory = sequelize.define("ProductCategory",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  name:DataTypes.STRING,
  slug:{type:DataTypes.STRING,unique:true},
  icon:DataTypes.STRING,
  description:DataTypes.TEXT,
  display_order:DataTypes.INTEGER
},{
  tableName:"product_categories",
  timestamps:false
});

export default ProductCategory;