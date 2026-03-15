import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            const { token: newToken, user: newUser } = res.data;
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));
            setToken(newToken);
            setUser(newUser);
            return newUser;
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async (accessToken) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/google-login', { access_token: accessToken });
            const { token: newToken, user: newUser } = res.data;
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));
            setToken(newToken);
            setUser(newUser);
            return newUser;
        } finally {
            setLoading(false);
        }
    };

    const githubLogin = async (code) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/github-login', { code });
            const { token: newToken, user: newUser } = res.data;
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));
            setToken(newToken);
            setUser(newUser);
            return newUser;
        } finally {
            setLoading(false);
        }
    };

    const register = async (formData) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/register', formData);
            const { token: newToken, user: newUser } = res.data;
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(newUser));
            setToken(newToken);
            setUser(newUser);
            return newUser;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = !!token;
    const isAdmin = user?.role === 'admin';
    const isStaff = user?.role === 'staff' || user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, token, loading, isAuthenticated, isAdmin, isStaff, login, googleLogin, githubLogin, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export default AuthContext;
