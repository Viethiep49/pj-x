import { User } from '../../models/index.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password_hash'] },
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: users });
    } catch (err) {
        next(err);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { email, password, full_name, role, is_active } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }

        const password_hash = await bcrypt.hash(password || '12345678', 12);

        const user = await User.create({
            email,
            password_hash,
            full_name,
            role: role || 'customer',
            is_active: is_active !== undefined ? is_active : true
        });

        const userData = user.toJSON();
        delete userData.password_hash;

        res.status(201).json({ success: true, data: userData });
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { full_name, role, is_active } = req.body;
        const updates = {};
        if (full_name !== undefined) updates.full_name = full_name;
        if (role !== undefined) updates.role = role;
        if (is_active !== undefined) updates.is_active = is_active;

        await user.update(updates);

        const userData = user.toJSON();
        delete userData.password_hash;

        res.json({ success: true, data: userData });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await user.destroy();
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
};
