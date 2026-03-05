import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payment = sequelize.define("Payment",{
  id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
  order_id:DataTypes.UUID,
  amount:DataTypes.DECIMAL,
  payment_method:DataTypes.STRING,
  payment_status:DataTypes.STRING
},{
  tableName:"payments",
  timestamps:true,
  createdAt:"created_at",
  updatedAt:false
});

export default Payment;