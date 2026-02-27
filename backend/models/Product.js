import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define("products", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  category_id: DataTypes.UUID,
  name: DataTypes.STRING(255),
  slug: { type: DataTypes.STRING(255), unique: true },
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL(12, 2),
  sale_price: DataTypes.DECIMAL(12, 2),
  stock_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  sku: { type: DataTypes.STRING(50), unique: true },
  image_url: DataTypes.TEXT,
  images: { type: DataTypes.JSONB, defaultValue: [] },
  target_species: DataTypes.STRING(20),
  target_fur_type: DataTypes.STRING(20),
  target_size: DataTypes.STRING(20),
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  rating_avg: { type: DataTypes.DECIMAL(3, 2), defaultValue: 0 },
  rating_count: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Product;