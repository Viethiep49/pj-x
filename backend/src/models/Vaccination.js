import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Vaccination = sequelize.define(
  "Vaccination",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    pet_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    vaccine_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    administered_by: {
      type: DataTypes.UUID,
    },

    dose_number: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    vaccination_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    next_due_date: {
      type: DataTypes.DATEONLY,
    },

    batch_number: {
      type: DataTypes.STRING,
    },

    notes: {
      type: DataTypes.TEXT,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "completed",
      allowNull: true,
      validate: {
        isIn: [["scheduled", "completed", "missed", "cancelled"]],
      },
    },
  },
  {
    tableName: "vaccinations",
    timestamps: false,
  }
);

export default Vaccination;