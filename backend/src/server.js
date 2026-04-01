import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import sequelize from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import { apiLimiter } from './middlewares/rateLimiter.js';

// Route imports
import authRoutes from './routes/auth/auth.routes.js';
import breedRoutes from './routes/breed.routes.js';
import userRoutes from './routes/user.routes.js';
import petRoutes from './routes/pet.routes.js';
import serviceRoutes from './routes/service.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import vaccinationRoutes from './routes/vaccination.routes.js';
import aiRoutes from './routes/ai.routes.js';
import paymentRoutes from './routes/payment/payment.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ─── Security ────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// ─── Body Parsing ────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Rate Limiting ───────────────────────────────────
app.use('/api', apiLimiter);

// ─── Routes ──────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/breeds', breedRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/payments', paymentRoutes);

// ─── Health Check ────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Pawsitive API is running 🐾', port: PORT });
});

// ─── 404 ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Error Handler ───────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Tự động tạo bảng (sync) nếu chưa có - Quan trọng cho Docker mới
    await sequelize.sync({ alter: false }); 
    console.log('📦 Database models synchronized');

    app.listen(PORT, () => {
      console.log(`🚀 Pawsitive API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.log('⚠️  Server starting without database — connect PostgreSQL to enable full functionality');
    app.listen(PORT, () => {
      console.log(`🚀 Pawsitive API running on http://localhost:${PORT} (no DB)`);
    });
  }
};

startServer();