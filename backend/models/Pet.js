import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pet = sequelize.define("pets", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  owner_id: DataTypes.UUID,
  breed_id: DataTypes.UUID,
  name: DataTypes.STRING(100),
  species: DataTypes.STRING(10),
  breed: DataTypes.STRING(100),
  fur_length: DataTypes.STRING(20),
  weight: DataTypes.DECIMAL(5, 2),
  gender: DataTypes.STRING(10),
  age: DataTypes.INTEGER,
  image_url: DataTypes.TEXT,
  medical_history: DataTypes.TEXT,
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Pet;