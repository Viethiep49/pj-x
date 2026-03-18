import express from 'express';
import { createMomoPayment, handleMomoIPN } from '../../controllers/paymentController.js';
import { protect } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/momo', protect, createMomoPayment);
router.post('/momo-ipn', handleMomoIPN);

export default router;
