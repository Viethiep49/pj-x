import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderItem = sequelize.define("OrderItem",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  order_id:DataTypes.UUID,
  product_id:DataTypes.UUID,
  quantity:DataTypes.INTEGER,
  price:DataTypes.DECIMAL
},{
  tableName:"order_items",
  timestamps:false
});

export default OrderItem;