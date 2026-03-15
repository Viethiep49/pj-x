import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe, googleAuth } from '../../controllers/auth/auth.controller.js';
import { protect } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { authLimiter } from '../../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/register', authLimiter, [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('full_name').notEmpty().withMessage('Full name required'),
], validate, register);

router.post('/login', authLimiter, [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
], validate, login);

router.get('/me', protect, getMe);
router.post('/google', googleAuth);

export default router;
