import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";
import {
  User,
  Pet,
  Breed,
  Product,
  Order,
  OrderItem,
  Service,
  ScanResult,
} from "./index.js";
import Appointment from "./Appointment.js"; 

const SEED_COUNT = {
  USERS: 50,
  ORDERS: 300,
  APPOINTMENTS: 150,
};

async function seed() {
  console.log("🚀 Starting Heavy Seeding with Faker.js...");

  try {
    await sequelize.authenticate();
    console.log("✅ Database connected.");

    // 1. Get existing base data
    const breeds = await Breed.findAll();
    const products = await Product.findAll();
    const services = await Service.findAll();

    if (breeds.length === 0 || products.length === 0 || services.length === 0) {
      console.error("❌ Missing base data (Breeds, Products, or Services). Run seed.sql first.");
      process.exit(1);
    }

    const passwordHash = await bcrypt.hash("Pawsitive@2024", 10);

    // 2. Generate Users
    console.log(`👥 Generating ${SEED_COUNT.USERS} Users...`);
    const users = [];
    for (let i = 0; i < SEED_COUNT.USERS; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      users.push({
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        password_hash: passwordHash,
        full_name: `${firstName} ${lastName}`,
        phone_number: faker.phone.number({ style: "national" }),
        address: faker.location.streetAddress(true),
        role: "customer",
        is_active: true,
      });
    }
    const createdUsers = await User.bulkCreate(users, { returning: true });

    // 3. Generate Pets
    console.log("🐾 Generating Pets...");
    const pets = [];
    for (const user of createdUsers) {
      const petCount = faker.number.int({ min: 1, max: 2 });
      for (let j = 0; j < petCount; j++) {
        const breed = faker.helpers.arrayElement(breeds);
        pets.push({
          owner_id: user.id,
          breed_id: breed.id,
          name: faker.person.firstName(),
          species: breed.species,
          breed: breed.display_name,
          gender: faker.helpers.arrayElement(["male", "female"]), // Lowercase to match DB constraint
          fur_length: faker.helpers.arrayElement(["short", "medium", "long", "hairless"]),
          age: faker.number.int({ min: 1, max: 15 }),
          weight: faker.number.float({ min: 2, max: 30, fractionDigits: 1 }),
        });
      }
    }
    const createdPets = await Pet.bulkCreate(pets, { returning: true });

    // 4. Generate Orders & Order Items
    console.log(`💰 Generating ${SEED_COUNT.ORDERS} Orders...`);
    for (let i = 0; i < SEED_COUNT.ORDERS; i++) {
      const user = faker.helpers.arrayElement(createdUsers);
      const createdAt = faker.date.past({ years: 0.5 }); // Last 6 months
      
      const order = await Order.create({
        user_id: user.id,
        order_number: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
        status: faker.helpers.arrayElement(["pending", "confirmed", "processing", "shipping", "delivered", "cancelled"]),
        total_amount: 0,
        delivery_method: faker.helpers.arrayElement(["pickup", "shipping"]),
        shipping_address: user.address,
        created_at: createdAt,
        updated_at: createdAt
      });

      // Create 1-4 items per order
      const itemCount = faker.number.int({ min: 1, max: 4 });
      let totalAmount = 0;
      const orderItems = [];

      const selectedProducts = faker.helpers.arrayElements(products, itemCount);
      for (const product of selectedProducts) {
        const qty = faker.number.int({ min: 1, max: 3 });
        const price = parseFloat(product.price);
        totalAmount += price * qty;
        
        orderItems.push({
          order_id: order.id,
          product_id: product.id,
          quantity: qty,
          unit_price: price,
          subtotal: price * qty
        });
      }

      await OrderItem.bulkCreate(orderItems);
      await order.update({ total_amount: totalAmount });
    }

    // 5. Generate Appointments
    console.log(`📅 Generating ${SEED_COUNT.APPOINTMENTS} Appointments...`);
    for (let i = 0; i < SEED_COUNT.APPOINTMENTS; i++) {
        const user = faker.helpers.arrayElement(createdUsers);
        const userPets = createdPets.filter(p => p.owner_id === user.id);
        const pet = faker.helpers.arrayElement(userPets.length > 0 ? userPets : createdPets);
        const service = faker.helpers.arrayElement(services);
        
        const date = faker.date.between({
            from: faker.date.past({ years: 0.5 }),
            to: faker.date.soon({ days: 30 })
        });

        const isPast = date < new Date();
        const status = isPast 
            ? faker.helpers.arrayElement(["completed", "cancelled", "confirmed"])
            : faker.helpers.arrayElement(["pending", "confirmed"]);

        await Appointment.create({
            user_id: user.id,
            pet_id: pet.id,
            service_id: service.id,
            appointment_date: date,
            status: status,
            notes: faker.lorem.sentence(),
            created_at: faker.date.recent({ days: 60 }),
        });
    }

    // 6. Generate Scan Results
    console.log("📸 Generating 100 Scan Results...");
    const scanResults = [];
    for (let i = 0; i < 100; i++) {
        const user = faker.helpers.arrayElement(createdUsers);
        const breed = faker.helpers.arrayElement(breeds);
        const date = faker.date.recent({ days: 30 });
        
        scanResults.push({
            user_id: user.id,
            breed_id: breed.id,
            confidence: faker.number.float({ min: 0.6, max: 0.99, fractionDigits: 4 }),
            image_url: `https://pawsitive.blob.core.windows.net/scans/${faker.string.alphanumeric(10)}.jpg`,
            top_3_predictions: [
                { breed: breed.display_name, confidence: 0.85 },
                { breed: "Unknown", confidence: 0.1 },
                { breed: "Other", confidence: 0.05 }
            ],
            created_at: date
        });
    }
    await ScanResult.bulkCreate(scanResults);

    console.log("✨ Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
