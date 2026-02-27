import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrderItem = sequelize.define("order_items", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  order_id: DataTypes.UUID,
  product_id: DataTypes.UUID,
  quantity: DataTypes.INTEGER,
  unit_price: DataTypes.DECIMAL(12, 2),
  subtotal: DataTypes.DECIMAL(12, 2),
}, {
  timestamps: false,
});

export default OrderItem;