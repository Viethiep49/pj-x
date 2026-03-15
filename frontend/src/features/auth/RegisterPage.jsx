import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { PawPrint, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

const RegisterPage = () => {
    const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, googleLogin } = useAuth();

    // Handle GitHub OAuth callback (backend redirects here with token)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const githubToken = params.get('github_token');
        const githubUser = params.get('github_user');
        const githubError = params.get('error');

        if (githubError) {
            setError(decodeURIComponent(githubError));
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
        }

        if (githubToken && githubUser) {
            try {
                const user = JSON.parse(decodeURIComponent(githubUser));
                localStorage.setItem('token', githubToken);
                localStorage.setItem('user', JSON.stringify(user));
                window.history.replaceState({}, document.title, window.location.pathname);
                window.location.href = user.role === 'admin' || user.role === 'staff' ? '/admin' : '/';
            } catch (err) {
                setError('GitHub signup failed — invalid response');
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const user = await googleLogin(tokenResponse.access_token);
                navigate(user.role === 'admin' || user.role === 'staff' ? '/admin' : '/', { replace: true });
            } catch (err) {
                setError(err.response?.data?.message || 'Google signup failed.');
            }
        },
        onError: () => setError('Google Signup Failed')
    });

    const handleGitHubLogin = () => {
        const redirectUri = `${window.location.origin.replace('5173', '5001')}/auth/github/callback`;
        const scope = 'user:email';
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    };

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <Link to="/" className="flex items-center gap-2 mb-8 hover:scale-105 transition-transform group">
                <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
                <span className="font-fredoka font-bold text-gray-500">Back to Spa</span>
            </Link>

            <Card className="w-full p-12 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />

                <div className="flex flex-col items-center gap-6 mb-10 relative z-10">
                    <motion.div
                        whileHover={{ rotate: 15 }}
                        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-clay-sm"
                    >
                        <PawPrint className="text-white w-10 h-10" />
                    </motion.div>
                    <div className="text-center">
                        <h2 className="text-4xl font-fredoka font-bold text-gray-800 leading-tight">Join Our Pack!</h2>
                        <div className="flex items-center justify-center gap-2 mt-2 text-primary font-bold">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm">Exclusive spa perks await</span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-100 text-red-500 rounded-clay font-bold text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid gap-6 relative z-10">
                    <Input
                        id="full_name"
                        label="Full Name"
                        placeholder="Buddy Love"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        required
                    />
                    <Input
                        id="email"
                        label="Email address"
                        type="email"
                        placeholder="buddy@pawsitive.pet"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        id="password"
                        label="Create Password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        minLength={6}
                    />

                    <Button type="submit" className="w-full py-5 text-xl mt-2" disabled={isLoading}>
                        {isLoading ? 'Creating Magic...' : 'Join the Pack'}
                    </Button>
                </form>

                <div className="my-8 flex items-center justify-center gap-4 relative z-10">
                    <div className="h-0.5 w-full bg-cream"></div>
                    <span className="text-gray-400 font-bold whitespace-nowrap">Or join with</span>
                    <div className="h-0.5 w-full bg-cream"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full flex justify-center items-center gap-2 py-4 shadow-sm hover:bg-gray-50 bg-white"
                        onClick={() => handleGoogleLogin()}
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                        Google
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full flex justify-center items-center gap-2 py-4 shadow-sm hover:bg-gray-50 bg-white"
                        onClick={handleGitHubLogin}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </Button>
                </div>

                <div className="mt-10 text-center font-bold text-gray-500 relative z-10">
                    Already a member?{' '}
                    <Link to="/login" className="text-primary hover:underline">Sign in here</Link>
                </div>
            </Card>
        </div>
    );
};

const RegisterPageWithProvider = () => {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "placeholder-client-id"}>
            <RegisterPage />
        </GoogleOAuthProvider>
    );
};

export default RegisterPageWithProvider;
