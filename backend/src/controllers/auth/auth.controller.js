import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/index.js';

const signToken = (user) =>
    jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

export const register = async (req, res, next) => {
    try {
        const { email, password, full_name, phone_number } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(409).json({ success: false, message: 'Email already in use' });
        }

        const password_hash = await bcrypt.hash(password, 12);
        const user = await User.create({ email, password_hash, full_name, phone_number });

        const token = signToken(user);
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            token,
            user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user || !user.is_active) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = signToken(user);
        res.json({
            success: true,
            token,
            user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password_hash'] },
        });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

export const googleAuth = async (req, res, next) => {
    try {
        const { access_token, id_token } = req.body;
        if (!access_token && !id_token) return res.status(400).json({ success: false, message: 'No token provided' });

        let profile = null;

        if (access_token) {
            // validate tokeninfo optionally
            if (process.env.GOOGLE_CLIENT_ID) {
                try {
                    const tinfo = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${access_token}`);
                    if (!tinfo.ok) return res.status(401).json({ success: false, message: 'Invalid Google access token' });
                    const info = await tinfo.json();
                    const aud = info.aud || info.audience || info.issued_to;
                    if (aud && aud !== process.env.GOOGLE_CLIENT_ID) {
                        return res.status(401).json({ success: false, message: 'Google token audience mismatch' });
                    }
                } catch (e) {
                    console.warn('tokeninfo check failed', e);
                }
            }
            const resp = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
            if (!resp.ok) return res.status(401).json({ success: false, message: 'Invalid Google access token' });
            profile = await resp.json();
        } else if (id_token) {
            const tinfo = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);
            if (!tinfo.ok) return res.status(401).json({ success: false, message: 'Invalid Google id_token' });
            profile = await tinfo.json();
        }

        if (!profile || !profile.email) return res.status(400).json({ success: false, message: 'Unable to retrieve Google profile' });

        // find or create user
        let user = await User.findOne({ where: { email: profile.email } });
        if (!user) {
            // create a random password hash so DB NOT NULL constraint is satisfied
            const randomPassword = Math.random().toString(36).slice(-12);
            const password_hash = await bcrypt.hash(randomPassword, 12);
            user = await User.create({
                email: profile.email,
                password_hash,
                full_name: profile.name || profile.email.split('@')[0],
                is_active: true,
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

        return res.status(200).json({ success: true, token, user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role } });
    } catch (err) {
        next(err);
    }
};
