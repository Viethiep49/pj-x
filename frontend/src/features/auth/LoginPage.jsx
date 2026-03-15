import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { PawPrint, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { login, googleLogin } = useAuth();

    const from = location.state?.from?.pathname || '/';

    // Handle GitHub OAuth callback
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
                // Force page reload to update auth context
                window.location.href = user.role === 'admin' || user.role === 'staff' ? '/admin' : from;
            } catch (err) {
                setError('GitHub login failed — invalid response');
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }, [from]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const user = await login(formData.email, formData.password);
            navigate(user.role === 'admin' || user.role === 'staff' ? '/admin' : from, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log('Google tokenResponse:', tokenResponse);
            setError(null);
            try {
                const accessToken = tokenResponse.access_token || tokenResponse.credential;
                if (!accessToken) {
                    setError('No access token received from Google');
                    return;
                }
                const newUser = await googleLogin(accessToken);
                navigate(newUser.role === 'admin' || newUser.role === 'staff' ? '/admin' : from, { replace: true });
            } catch (err) {
                console.error('googleLogin error:', err);
                setError(err.response?.data?.message || 'Google login failed');
            }
        },
        onError: (errorResponse) => {
            console.error('Google login error:', errorResponse);
            setError('Google Login Failed');
        }
    });

    const handleGitHubLogin = () => {
        const redirectUri = `${window.location.origin.replace('5173', '5001')}/auth/github/callback`;
        const scope = 'user:email';
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    };

    return (
        <div className="flex flex-col items-center justify-center py-20 px-6">
            <Link to="/" className="flex items-center gap-2 mb-12 hover:scale-105 transition-transform group">
                <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
                <span className="font-fredoka font-bold text-gray-500">Back to Spa</span>
            </Link>

            <Card className="max-w-md w-full p-12">
                <div className="flex flex-col items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-clay-sm">
                        <PawPrint className="text-white w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-fredoka font-bold text-gray-800 text-center leading-tight">Welcome <br />Back!</h2>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border-2 border-red-100 text-red-500 rounded-clay font-bold text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid gap-6">
                    <Input
                        id="email"
                        label="Email address"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    <Button type="submit" className="w-full py-5 text-xl mt-4" disabled={isLoading}>
                        {isLoading ? 'Wait a paw...' : 'Sign in'}
                    </Button>
                </form>

                <div className="my-8 flex items-center justify-center gap-4">
                    <div className="h-0.5 w-full bg-cream"></div>
                    <span className="text-gray-400 font-bold whitespace-nowrap">Or continue with</span>
                    <div className="h-0.5 w-full bg-cream"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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

                <div className="mt-10 text-center font-bold text-gray-500">
                    New to Pawsitive?{' '}
                    <Link to="/register" className="text-primary hover:underline">Join our pack</Link>
                </div>
            </Card>
        </div>
    );
};

const LoginPageWithProvider = () => {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "placeholder-client-id"}>
            <LoginPage />
        </GoogleOAuthProvider>
    );
};

export default LoginPageWithProvider;
