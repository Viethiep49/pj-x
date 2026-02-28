import { DataTypes } from "sequelize";
import sequelize from "../src/config/db.js";

const Order = sequelize.define("orders", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: DataTypes.UUID,
  order_number: { type: DataTypes.STRING(20), unique: true },
  total_amount: DataTypes.DECIMAL(12, 2),
  delivery_method: { type: DataTypes.STRING(20), defaultValue: "pickup" },
  shipping_address: DataTypes.TEXT,
  shipping_fee: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
  receiver_name: DataTypes.STRING(100),
  receiver_phone: DataTypes.STRING(20),
  status: { type: DataTypes.STRING(20), defaultValue: "pending" },
  notes: DataTypes.TEXT,
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Order;