import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  user_id:DataTypes.UUID,
  order_number:{type:DataTypes.STRING,unique:true},
  status:DataTypes.STRING,
  total_amount:DataTypes.DECIMAL,
  delivery_method:DataTypes.STRING,
  shipping_address:DataTypes.TEXT,
  shipping_fee:DataTypes.DECIMAL,
  receiver_name:DataTypes.STRING,
  receiver_phone:DataTypes.STRING,
  notes:DataTypes.TEXT
},{
  tableName:"orders",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:"updated_at"
});

export default Order;