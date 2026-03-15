import express from 'express';
import { body } from 'express-validator';
import { getVaccineTypes, getPetVaccinations, createVaccination } from '../controllers/vaccination.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/rbac.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.use(protect);

router.get('/vaccine-types', getVaccineTypes);
router.get('/pets/:petId', getPetVaccinations);
router.post('/', authorize('admin', 'staff'), [
    body('pet_id').isUUID().withMessage('Valid pet ID required'),
    body('vaccine_type_id').isUUID().withMessage('Valid vaccine type ID required'),
    body('vaccination_date').isISO8601().withMessage('Valid date required'),
], validate, createVaccination);

export default router;
