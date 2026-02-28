import { DataTypes } from "sequelize";
import sequelize from "../src/config/db.js";

const Breed = sequelize.define("breeds", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(100), unique: true },
  display_name: DataTypes.STRING(100),
  species: DataTypes.STRING(10),
  fur_type: DataTypes.STRING(20),
  size_category: DataTypes.STRING(20),
  description: DataTypes.TEXT,
  image_url: DataTypes.TEXT,
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

export default Breed;