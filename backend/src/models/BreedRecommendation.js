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

    product_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    service_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    recommendation_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    recommendation_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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