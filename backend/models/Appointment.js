import { DataTypes } from "sequelize";
import sequelize from "../src/config/db.js";

const Appointment = sequelize.define("appointments", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: DataTypes.UUID,
  pet_id: DataTypes.UUID,
  service_id: DataTypes.UUID,
  appointment_date: DataTypes.DATE,
  status: { type: DataTypes.STRING(20), defaultValue: "pending" },
  notes: DataTypes.TEXT,
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Appointment;