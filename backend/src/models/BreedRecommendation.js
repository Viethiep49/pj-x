import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const BreedRecommendation = sequelize.define(
  "BreedRecommendation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    breed_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    pet_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    temperament: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    activity_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "breed_recommendations",
    timestamps: false,
  }
);

export default BreedRecommendation;