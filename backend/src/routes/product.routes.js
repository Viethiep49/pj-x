import express from 'express';
import { body } from 'express-validator';
import {
    getAllProducts, getProductById,
    createProduct, updateProduct, deleteProduct, addReview,
} from '../controllers/productController.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/rbac.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

// Public
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Authenticated
router.post('/:id/reviews', protect, [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
    body('comment').optional().trim().escape(),
], validate, addReview);

// Admin only
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;
