import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Payment = sequelize.define("payments", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: DataTypes.UUID,
  appointment_id: DataTypes.UUID,
  order_id: DataTypes.UUID,
  payment_type: DataTypes.STRING(20),
  amount: DataTypes.DECIMAL(12, 2),
  payment_method: DataTypes.STRING(50),
  status: { type: DataTypes.STRING(20), defaultValue: "pending" },
  transaction_id: DataTypes.STRING(100),
  transaction_date: DataTypes.DATE,
}, {
  timestamps: false,
});

export default Payment;