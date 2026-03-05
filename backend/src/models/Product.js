import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("Product",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  category_id:DataTypes.UUID,
  name:{type:DataTypes.STRING,allowNull:false},
  slug:{type:DataTypes.STRING,unique:true},
  description:DataTypes.TEXT,
  price:{type:DataTypes.DECIMAL,allowNull:false},
  sale_price:DataTypes.DECIMAL,
  stock_quantity:DataTypes.INTEGER,
  sku:{type:DataTypes.STRING,unique:true},
  image_url:DataTypes.TEXT,
  images:DataTypes.JSONB,
  target_species:DataTypes.STRING,
  target_fur_type:DataTypes.STRING,
  target_size:DataTypes.STRING,
  is_active:{type:DataTypes.BOOLEAN,defaultValue:true},
  rating_avg:DataTypes.DECIMAL,
  rating_count:DataTypes.INTEGER
},{
  tableName:"products",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:"updated_at"
});

export default Product;