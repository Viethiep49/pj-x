import User from "./User.js";
import Pet from "./Pet.js";
import Product from "./Product.js";
import ProductCategory from "./ProductCategory.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Vaccination from "./Vaccination.js";
import VaccineType from "./VaccineType.js";

User.hasMany(Pet,{foreignKey:"owner_id"});
Pet.belongsTo(User,{foreignKey:"owner_id"});

ProductCategory.hasMany(Product,{foreignKey:"category_id"});
Product.belongsTo(ProductCategory,{foreignKey:"category_id"});

Order.hasMany(OrderItem,{foreignKey:"order_id"});
OrderItem.belongsTo(Order,{foreignKey:"order_id"});

Product.hasMany(OrderItem,{foreignKey:"product_id"});
OrderItem.belongsTo(Product,{foreignKey:"product_id"});

Vaccination.belongsTo(VaccineType, {
  foreignKey: "vaccine_type_id",
});

export {
User,
Pet,
Product,
Vaccination,
VaccineType,
ProductCategory,
Order,
OrderItem
};