import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const VaccineType = sequelize.define("vaccine_types", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: DataTypes.STRING(100),
  target_species: DataTypes.STRING(10),
  description: DataTypes.TEXT,
  recommended_age_months: DataTypes.INTEGER,
  interval_days: DataTypes.INTEGER,
  doses_required: { type: DataTypes.INTEGER, defaultValue: 1 },
}, {
  timestamps: false,
});

export default VaccineType;