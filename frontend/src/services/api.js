import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const AI_BASE_URL = import.meta.env.VITE_AI_URL || 'http://localhost:8000';

// ─── Backend API instance ────────────────────────────────────────
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle 401 globally → clear token and redirect
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ─── AI Core instance ────────────────────────────────────────────
export const aiApi = axios.create({
    baseURL: AI_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export default api;
