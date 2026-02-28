import { DataTypes } from "sequelize";
import sequelize from "../src/config/db.js";

const Service = sequelize.define("services", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: DataTypes.STRING(100),
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL(12, 2),
  duration_minutes: DataTypes.INTEGER,
  target_species: DataTypes.STRING(20),
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  image_url: DataTypes.TEXT,
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

export default Service;