import express from 'express';
import {
    getAllBreeds, getBreedById, getBreedRecommendations,
    createBreed, updateBreed, deleteBreed
} from '../controllers/breedController.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/rbac.js';

const router = express.Router();

router.get('/', getAllBreeds);
router.get('/:id', getBreedById);
router.get('/:id/recommendations', getBreedRecommendations);

// Admin only
router.post('/', protect, authorize('admin'), createBreed);
router.put('/:id', protect, authorize('admin'), updateBreed);
router.delete('/:id', protect, authorize('admin'), deleteBreed);

export default router;
