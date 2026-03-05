import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const VaccineType = sequelize.define(
  "VaccineType",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },

    recommended_interval_days: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "vaccine_types",
    timestamps: false,
  }
);

export default VaccineType;