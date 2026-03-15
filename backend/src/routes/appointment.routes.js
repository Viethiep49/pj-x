import express from 'express';
import { body } from 'express-validator';
import {
    getMyAppointments, createAppointment,
    getAvailableSlots, getAllAppointments, updateAppointmentStatus,
} from '../controllers/appointment.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/rbac.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.use(protect);

router.get('/slots', getAvailableSlots);
router.get('/', getMyAppointments);
router.post('/', [
    body('pet_id').isUUID().withMessage('Valid pet ID required'),
    body('appointment_date').isISO8601().withMessage('Valid date required'),
], validate, createAppointment);

// Admin/Staff
router.get('/admin', authorize('admin', 'staff'), getAllAppointments);
router.put('/admin/:id', authorize('admin', 'staff'), [
    body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled']).withMessage('Invalid status'),
], validate, updateAppointmentStatus);

export default router;
