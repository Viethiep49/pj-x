import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ScanResult = sequelize.define("scan_results", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: DataTypes.UUID,
  pet_id: DataTypes.UUID,
  breed_id: DataTypes.UUID,
  confidence: DataTypes.DECIMAL(5, 4),
  image_url: DataTypes.TEXT,
  top_3_predictions: DataTypes.JSONB,
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

export default ScanResult;