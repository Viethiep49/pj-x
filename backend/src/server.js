import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import petRoutes from "./routes/petsRouters.js";
import servicesRouters from "./routes/servicesRouters.js";
import productsRouters from "./routes/productsRouters.js";
import ordersRouters from "./routes/ordersRouters.js";
import appointmentsRouters from "./routes/appointmentsRouters.js";
import vaccinationsRouters from "./routes/vaccinationsRouters.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/pets", petRoutes);
app.use("/api/services", servicesRouters);
app.use("/api/products", productsRouters);
app.use("/api/orders", ordersRouters);
app.use("/api/appointments", appointmentsRouters);
app.use("/api/vaccinations", vaccinationsRouters);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // xóa và tạo lại bảng

    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("DB error:", error);
  }
};

startServer();
