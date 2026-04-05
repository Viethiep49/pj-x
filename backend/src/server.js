import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import sequelize from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { User } from '../models/index.js';

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

// GitHub OAuth callback: handle success and cancel
app.get('/auth/github/callback', async (req, res) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const { code, error, error_description: errorDescription } = req.query;

  if (error) {
    return res.redirect(
      `${clientUrl}/login?error=${encodeURIComponent(errorDescription || 'GitHub login cancelled')}`
    );
  }

  if (!code) {
    return res.redirect(
      `${clientUrl}/login?error=${encodeURIComponent('GitHub did not return a code')}`
    );
  }

  try {
    const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${req.protocol}://${req.get('host')}${req.path}`,
      }),
    });

    const tokenData = await tokenResp.json();
    const accessToken = tokenData?.access_token;
    if (!accessToken) {
      return res.redirect(
        `${clientUrl}/login?error=${encodeURIComponent('Unable to obtain GitHub access token')}`
      );
    }

    const profileResp = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'pj-x-app',
      },
    });
    const profile = await profileResp.json();

    let email = profile?.email;
    if (!email) {
      const emailsResp = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'pj-x-app',
        },
      });
      const emails = await emailsResp.json();
      const primary = Array.isArray(emails)
        ? emails.find((e) => e.primary && e.verified) || emails.find((e) => e.verified) || emails[0]
        : null;
      email = primary?.email;
    }

    if (!email) {
      return res.redirect(
        `${clientUrl}/login?error=${encodeURIComponent('GitHub account has no accessible email')}`
      );
    }

    let user = await User.findOne({ where: { email } });
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-12);
      const password_hash = await bcrypt.hash(randomPassword, 12);
      user = await User.create({
        email,
        password_hash,
        full_name: profile?.name || profile?.login || email.split('@')[0],
        avatar_url: profile?.avatar_url,
        is_active: true,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    );

    const safeUser = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    };

    const redirectUrl = `${clientUrl}/login?github_token=${encodeURIComponent(
      token
    )}&github_user=${encodeURIComponent(JSON.stringify(safeUser))}`;
    return res.redirect(redirectUrl);
  } catch (err) {
    console.error('GitHub OAuth error:', err);
    return res.redirect(
      `${clientUrl}/login?error=${encodeURIComponent('GitHub login failed, please try again')}`
    );
  }
});

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
