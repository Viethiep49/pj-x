import User from "./User.js";
import Pet from "./Pet.js";
import Product from "./Product.js";
import ProductCategory from "./ProductCategory.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Vaccination from "./Vaccination.js";
import VaccineType from "./VaccineType.js";
import Breed from "./Breed.js";
import BreedRecommendation from "./BreedRecommendation.js";
import Service from "./Service.js";
import ScanResult from "./ScanResult.js";

// User - Pet
User.hasMany(Pet, { foreignKey: "owner_id" });
Pet.belongsTo(User, { foreignKey: "owner_id" });

// Product - Category
ProductCategory.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(ProductCategory, { foreignKey: "category_id" });

// Order - OrderItem
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

// Product - OrderItem
Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

// Vaccination - VaccineType
Vaccination.belongsTo(VaccineType, { foreignKey: "vaccine_type_id" });

// Breed - BreedRecommendation
Breed.hasMany(BreedRecommendation, { foreignKey: "breed_id" });
BreedRecommendation.belongsTo(Breed, { foreignKey: "breed_id" });

// BreedRecommendation - Product/Service
BreedRecommendation.belongsTo(Product, { foreignKey: "product_id", as: "product" });
BreedRecommendation.belongsTo(Service, { foreignKey: "service_id", as: "service" });

// ScanResult - User
User.hasMany(ScanResult, { foreignKey: "user_id" });
ScanResult.belongsTo(User, { foreignKey: "user_id" });

export {
  User,
  Pet,
  Product,
  Vaccination,
  VaccineType,
  ProductCategory,
  Order,
  OrderItem,
  Breed,
  BreedRecommendation,
  Service,
  ScanResult,
};