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
      allowNull: false,
    },

    pet_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    predicted_breed: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    confidence_score: {
      type: DataTypes.FLOAT,
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