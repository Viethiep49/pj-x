import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Vaccination = sequelize.define("vaccinations", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  pet_id: DataTypes.UUID,
  vaccine_type_id: DataTypes.UUID,
  administered_by: DataTypes.UUID,
  dose_number: { type: DataTypes.INTEGER, defaultValue: 1 },
  vaccination_date: DataTypes.DATEONLY,
  next_due_date: DataTypes.DATEONLY,
  batch_number: DataTypes.STRING(50),
  notes: DataTypes.TEXT,
  status: { type: DataTypes.STRING(20), defaultValue: "completed" },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

export default Vaccination;