import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Breed = sequelize.define(
  "Breed",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    display_name: { type: DataTypes.STRING, allowNull: false },
    species: { type: DataTypes.ENUM("dog", "cat"), allowNull: false },
    fur_type: DataTypes.STRING,
    size_category: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
  },
  {
    tableName: "breeds",
    timestamps: false,
  },
);

export default Breed;
