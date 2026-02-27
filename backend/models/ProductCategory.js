import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProductCategory = sequelize.define("product_categories", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: DataTypes.STRING(100),
  slug: { type: DataTypes.STRING(100), unique: true },
  icon: DataTypes.STRING(50),
  description: DataTypes.TEXT,
  display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  timestamps: false,
});

export default ProductCategory;