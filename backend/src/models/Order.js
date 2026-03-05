import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  user_id:DataTypes.UUID,
  status:DataTypes.STRING,
  total_amount:DataTypes.DECIMAL,
  shipping_address:DataTypes.TEXT
},{
  tableName:"orders",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:"updated_at"
});

export default Order;