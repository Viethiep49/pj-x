import { DataTypes } from "sequelize";
import sequelize from "../src/config/db.js";

const ProductReview = sequelize.define("product_reviews", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  product_id: DataTypes.UUID,
  user_id: DataTypes.UUID,
  rating: DataTypes.INTEGER,
  comment: DataTypes.TEXT,
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

export default ProductReview;