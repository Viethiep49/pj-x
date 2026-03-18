import express from 'express';
import { body } from 'express-validator';
import { getMyOrders, createOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/rbac.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.use(protect);

router.get('/', getMyOrders);
router.post('/', [
    body('items').isArray({ min: 1 }).withMessage('At least 1 item required'),
    body('delivery_method').isIn(['pickup', 'shipping']).withMessage('Invalid delivery method'),
    body('payment_method').optional().isIn(['card', 'paypal', 'momo']).withMessage('Invalid payment method'),
], validate, createOrder);

// Admin
router.get('/admin', authorize('admin', 'staff'), getAllOrders);
router.put('/admin/:id', authorize('admin', 'staff'), [
    body('status').isIn(['pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled']),
], validate, updateOrderStatus);

export default router;
