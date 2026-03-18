import sequelize from '../src/config/db.js';

import User from './User.js';
import Breed from './Breed.js';
import Pet from './Pet.js';
import ProductCategory from './ProductCategory.js';
import Product from './Product.js';
import Service from './Service.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Appointment from './Appointment.js';
import VaccineType from './VaccineType.js';
import Vaccination from './Vaccination.js';
import Payment from './Payment.js';
import ProductReview from './ProductReview.js';
import ScanResult from './ScanResult.js';
import BreedRecommendation from './BreedRecommendation.js';

// ─── Associations ─────────────────────────────────────────────

// User ↔ Pet
User.hasMany(Pet, { foreignKey: 'owner_id', as: 'pets' });
Pet.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// Breed ↔ Pet
Breed.hasMany(Pet, { foreignKey: 'breed_id', as: 'pets' });
Pet.belongsTo(Breed, { foreignKey: 'breed_id', as: 'breed_info' });

// ProductCategory ↔ Product
ProductCategory.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(ProductCategory, { foreignKey: 'category_id', as: 'category' });

// User ↔ Order
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'customer' });

// Order ↔ OrderItem ↔ Product
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'order_items' });

// User ↔ Appointment ↔ Pet ↔ Service
User.hasMany(Appointment, { foreignKey: 'user_id', as: 'appointments' });
Appointment.belongsTo(User, { foreignKey: 'user_id', as: 'customer' });
Pet.hasMany(Appointment, { foreignKey: 'pet_id', as: 'appointments' });
Appointment.belongsTo(Pet, { foreignKey: 'pet_id', as: 'pet' });
Service.hasMany(Appointment, { foreignKey: 'service_id', as: 'appointments' });
Appointment.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

// Pet ↔ Vaccination ↔ VaccineType
Pet.hasMany(Vaccination, { foreignKey: 'pet_id', as: 'vaccinations' });
Vaccination.belongsTo(Pet, { foreignKey: 'pet_id', as: 'pet' });
VaccineType.hasMany(Vaccination, { foreignKey: 'vaccine_type_id', as: 'records' });
Vaccination.belongsTo(VaccineType, { foreignKey: 'vaccine_type_id', as: 'vaccine_type' });
User.hasMany(Vaccination, { foreignKey: 'administered_by', as: 'administered_vaccinations' });
Vaccination.belongsTo(User, { foreignKey: 'administered_by', as: 'administered_by_staff' });

// User ↔ Payment
User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' });
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Order ↔ Payment
Order.hasMany(Payment, { foreignKey: 'order_id', as: 'payments' });
Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// Appointment ↔ Payment
Appointment.hasMany(Payment, { foreignKey: 'appointment_id', as: 'payments' });
Payment.belongsTo(Appointment, { foreignKey: 'appointment_id', as: 'appointment' });

// Product ↔ ProductReview
Product.hasMany(ProductReview, { foreignKey: 'product_id', as: 'reviews', onDelete: 'CASCADE' });
ProductReview.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
User.hasMany(ProductReview, { foreignKey: 'user_id', as: 'reviews' });
ProductReview.belongsTo(User, { foreignKey: 'user_id', as: 'reviewer' });

// Breed ↔ ScanResult
Breed.hasMany(ScanResult, { foreignKey: 'breed_id', as: 'scan_results' });
ScanResult.belongsTo(Breed, { foreignKey: 'breed_id', as: 'breed' });
User.hasMany(ScanResult, { foreignKey: 'user_id', as: 'scan_results' });
ScanResult.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Breed ↔ BreedRecommendation ↔ Product/Service
Breed.hasMany(BreedRecommendation, { foreignKey: 'breed_id', as: 'recommendations' });
BreedRecommendation.belongsTo(Breed, { foreignKey: 'breed_id', as: 'breed' });
Product.hasMany(BreedRecommendation, { foreignKey: 'product_id', as: 'breed_recommendations' });
BreedRecommendation.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Service.hasMany(BreedRecommendation, { foreignKey: 'service_id', as: 'breed_recommendations' });
BreedRecommendation.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

export {
    sequelize,
    User, Breed, Pet,
    ProductCategory, Product,
    Service,
    Order, OrderItem,
    Appointment,
    VaccineType, Vaccination,
    Payment,
    ProductReview,
    ScanResult,
    BreedRecommendation,
};
