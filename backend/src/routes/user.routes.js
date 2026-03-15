import express from 'express';
import { body } from 'express-validator';
import {
    getAllUsers, createUser, updateUser, deleteUser
} from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/rbac.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

// All user routes are admin-only
router.use(protect);
router.use(authorize('admin'));

router.get('/', getAllUsers);

router.post('/', [
    body('email').isEmail().withMessage('Valid email required'),
    body('full_name').notEmpty().withMessage('Full name required')
], validate, createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
