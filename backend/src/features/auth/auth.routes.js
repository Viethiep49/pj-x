const express = require('express');
const router = express.Router();

// Mock Controller Logic
const login = (req, res) => {
    const { email, password } = req.body;
    // Mock logic
    if (email === 'admin@example.com' && password === '123456') {
        return res.status(200).json({
            success: true,
            token: 'mock-jwt-token-123',
            user: { id: 1, email, name: 'Admin User' }
        });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
};

const register = (req, res) => {
    const { email, password, name } = req.body;
    return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: { id: 2, email, name }
    });
};

const me = (req, res) => {
    // Mock auth check
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    return res.status(200).json({
        success: true,
        user: { id: 1, email: 'admin@example.com', name: 'Admin User' }
    });
};

router.post('/login', login);
router.post('/register', register);
router.get('/me', me);

module.exports = router;
