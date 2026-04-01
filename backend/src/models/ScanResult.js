import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ScanResult = sequelize.define(
  "ScanResult",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    pet_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    breed_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    confidence: {
      type: DataTypes.DECIMAL(5, 4),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    top_3_predictions: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "scan_results",
    timestamps: false,
  }
);

export default ScanResult;