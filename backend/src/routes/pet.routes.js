import express from 'express';
import { body } from 'express-validator';
import { getMyPets, createPet, updatePet, deletePet } from '../controllers/petController.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.use(protect);

router.get('/', getMyPets);
router.post('/', [
    body('name').notEmpty().withMessage('Pet name required'),
    body('species').isIn(['dog', 'cat']).withMessage('Species must be dog or cat'),
], validate, createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;
