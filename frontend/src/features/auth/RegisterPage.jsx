import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { PawPrint, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, googleLogin } = useAuth();

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

    const responseFacebook = async (response) => {
        if (response.accessToken) {
            alert("Facebook Signup Success! Integration pending credentials.");
        } else {
            setError('Facebook Signup Failed');
        }
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

                    {import.meta.env.VITE_FACEBOOK_APP_ID ? (
                        <FacebookLogin
                            appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                            autoLoad={false}
                            fields="name,email,picture"
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
