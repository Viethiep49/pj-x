import sequelize from "../src/config/db.js";

import User from "./User.js";
import ProductCategory from "./ProductCategory.js";
import Product from "./Product.js";
import ProductReview from "./ProductReview.js";
import Breed from "./Breed.js";
import Pet from "./Pet.js";
import ScanResult from "./ScanResult.js";
import Service from "./Service.js";
import BreedRecommendation from "./BreedRecommendation.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Appointment from "./Appointment.js";
import VaccineType from "./VaccineType.js";
import Vaccination from "./Vaccination.js";
import Payment from "./Payment.js";

/* Product */
Product.belongsTo(ProductCategory, { foreignKey: "category_id" });
ProductCategory.hasMany(Product, { foreignKey: "category_id" });

/* Reviews */
ProductReview.belongsTo(Product, { foreignKey: "product_id" });
ProductReview.belongsTo(User, { foreignKey: "user_id" });

/* Pets */
Pet.belongsTo(User, { foreignKey: "owner_id" });
Pet.belongsTo(Breed, { foreignKey: "breed_id", as: "breedInfo" });

/* Scan results */
ScanResult.belongsTo(User, { foreignKey: "user_id" });
ScanResult.belongsTo(Pet, { foreignKey: "pet_id" });
ScanResult.belongsTo(Breed, { foreignKey: "breed_id" });

/* Breed recommendations */
BreedRecommendation.belongsTo(Breed, { foreignKey: "breed_id" });
BreedRecommendation.belongsTo(Product, { foreignKey: "product_id" });
BreedRecommendation.belongsTo(Service, { foreignKey: "service_id" });

/* Orders */
Order.belongsTo(User, { foreignKey: "user_id" });
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });

OrderItem.belongsTo(Order, { foreignKey: "order_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

/* Appointments */
Appointment.belongsTo(User, { foreignKey: "user_id" });
Appointment.belongsTo(Pet, { foreignKey: "pet_id" });
Appointment.belongsTo(Service, { foreignKey: "service_id" });

/* Vaccinations */
Vaccination.belongsTo(Pet, { foreignKey: "pet_id" });
Vaccination.belongsTo(VaccineType, { foreignKey: "vaccine_type_id" });
Vaccination.belongsTo(User, { foreignKey: "administered_by" });

/* Payments */
Payment.belongsTo(User, { foreignKey: "user_id" });
Payment.belongsTo(Order, { foreignKey: "order_id" });
Payment.belongsTo(Appointment, { foreignKey: "appointment_id" });

export {
  sequelize,
  User,
  ProductCategory,
  Product,
  ProductReview,
  Breed,
  Pet,
  ScanResult,
  Service,
  BreedRecommendation,
  Order,
  OrderItem,
  Appointment,
  VaccineType,
  Vaccination,
  Payment,
};
