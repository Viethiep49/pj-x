import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { PawPrint, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import api from '../../services/api';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { login, socialLogin } = useAuth();

    const from = location.state?.from?.pathname || '/';

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
                const newUser = await socialLogin('google', accessToken);
                navigate(newUser.role === 'admin' || newUser.role === 'staff' ? '/admin' : from, { replace: true });
            } catch (err) {
                console.error('socialLogin error:', err);
                setError(err.response?.data?.message || 'Google login failed');
            }
        },
        onError: (errorResponse) => {
            console.error('Google login error:', errorResponse);
            setError('Google Login Failed');
        }
    });

    const responseFacebook = async (response) => {
        if (response.accessToken) {
            setError(null);
            try {
                const newUser = await socialLogin('facebook', response.accessToken);
                navigate(newUser.role === 'admin' || newUser.role === 'staff' ? '/admin' : from, { replace: true });
            } catch (err) {
                setError(err.response?.data?.message || 'Facebook login failed');
            }
        } else {
            setError('Facebook Login Failed');
        }
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

                    {import.meta.env.VITE_FACEBOOK_APP_ID ? (
                        <FacebookLogin
                            appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="email,public_profile"
                            callback={responseFacebook}
                            render={renderProps => (
                                <Button
                                    type="button"
                                    onClick={renderProps.onClick}
                                    className="w-full flex justify-center items-center gap-2 py-4 bg-[#1877F2] hover:bg-[#166FE5] border-transparent text-white shadow-sm"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    Facebook
                                </Button>
                            )}
                        />
                    ) : (
                        <Button
                            type="button"
                            onClick={responseFacebook}
                            className="w-full flex justify-center items-center gap-2 py-4 bg-[#1877F2] hover:bg-[#166FE5] border-transparent text-white shadow-sm disabled:opacity-50"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            Facebook
                        </Button>
                    )}
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
