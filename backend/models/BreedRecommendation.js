import { DataTypes } from "sequelize";
import sequelize from "../src/config/db.js";

const BreedRecommendation = sequelize.define("breed_recommendations", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  breed_id: DataTypes.UUID,
  product_id: DataTypes.UUID,
  service_id: DataTypes.UUID,
  recommendation_type: DataTypes.STRING(20),
  recommendation_reason: DataTypes.TEXT,
  priority: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  timestamps: false,
});

export default BreedRecommendation;