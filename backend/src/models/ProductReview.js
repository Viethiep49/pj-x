import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductReview = sequelize.define("ProductReview",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  product_id:DataTypes.UUID,
  user_id:DataTypes.UUID,
  rating:DataTypes.INTEGER,
  comment:DataTypes.TEXT
},{
  tableName:"product_reviews",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:false
});

export default ProductReview;