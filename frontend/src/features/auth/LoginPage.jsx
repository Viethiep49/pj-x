import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { PawPrint, ArrowLeft } from 'lucide-react';
import { loginUser } from './authService';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const data = await loginUser(formData.email, formData.password);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
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

                    <div className="flex items-center justify-between text-sm px-2">
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-500">
                            <input type="checkbox" className="rounded-full border-2 border-cream text-primary focus:ring-primary/20" />
                            <span>Stay logged in</span>
                        </label>
                        <a href="#" className="text-primary font-bold hover:underline">Forgot?</a>
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-5 text-xl mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Wait a paw...' : 'Sign in'}
                    </Button>
                </form>

                <div className="mt-10 text-center font-bold text-gray-500">
                    New to Pawsitive?{' '}
                    <Link to="/register" className="text-primary hover:underline">
                        Join our pack
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
