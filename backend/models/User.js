import { DataTypes } from "sequelize";
import sequelize from "../src/config/db.js";

const User = sequelize.define("users", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  full_name: { type: DataTypes.STRING(100), allowNull: false },
  phone_number: DataTypes.STRING(20),
  avatar_url: DataTypes.TEXT,
  address: DataTypes.TEXT,
  role: { type: DataTypes.STRING(20), defaultValue: "customer" },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default User;