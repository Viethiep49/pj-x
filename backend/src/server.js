import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

// Import models (quan trọng để Sequelize load bảng)
import "../src/models/index.js";

// Routes
import petRoutes from "./routes/petsRouters.js";
import servicesRouters from "./routes/servicesRouters.js";
import productsRouters from "./routes/productsRouters.js";
import ordersRouters from "./routes/ordersRouters.js";
import appointmentsRouters from "./routes/appointmentsRouters.js";
import vaccinationsRouters from "./routes/vaccinationsRouters.js";
import vaccineTypeRoutes from "./routes/vaccineTypeRoutes.js";
import authRoutes from "./routes/auth/auth.routes.js";
import paymentRoutes from "./routes/payment/payment.routes.js";
import breedsRoutes from "./routes/breedsRoutes.js";
import productAdminRoutes from "./routes/admin/productsAdminRoutes.js";
import ordersAdminRoutes from "./routes/admin/ordersAdminRoutes.js";
import appointmentsAdminRoutes from "./routes/admin/appointmentsAdminRoutes.js";


dotenv.config();

const app = express();

/* =========================
   Middleware
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   API Routes
========================= */

app.use("/api/pets", petRoutes);
app.use("/api/services", servicesRouters);
app.use("/api/products", productsRouters);
app.use("/api/orders", ordersRouters);
app.use("/api/appointments", appointmentsRouters);
app.use("/api/vaccinations", vaccinationsRouters);
app.use("/api/vaccine-types", vaccineTypeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/breeds", breedsRoutes);

app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", ordersAdminRoutes);
app.use("/api/admin/appointments", appointmentsAdminRoutes);
/* =========================
   Health Check API
========================= */

app.get("/", (req, res) => {
  res.json({
    message: "Pawsitive Pet Spa API running",
    status: "OK",
  });
});

/* =========================
   Start Server
========================= */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully");

    await sequelize.authenticate();

    console.log("Database synchronized");

    // Start express
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

startServer();
