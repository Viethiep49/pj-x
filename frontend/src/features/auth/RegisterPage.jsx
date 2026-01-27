import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { PawPrint, ArrowLeft, Sparkles } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration
        setTimeout(() => {
            setIsLoading(false);
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <Link to="/" className="flex items-center gap-2 mb-8 hover:scale-105 transition-transform group">
                <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform" />
                <span className="font-fredoka font-bold text-gray-500">Back to Spa</span>
            </Link>

            <Card className="w-full p-12 relative overflow-hidden">
                {/* Decorative Element */}
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

                <form onSubmit={handleSubmit} className="grid gap-6 relative z-10">
                    <Input
                        id="name"
                        label="Full Name"
                        placeholder="Buddy Love"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    />

                    <div className="text-xs text-center text-gray-400 font-medium px-4 leading-relaxed">
                        By joining our pack, you agree to our <a href="#" className="text-primary hover:underline">Terms of Treat</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-5 text-xl mt-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Magic...' : 'Join the Pack'}
                    </Button>
                </form>

                <div className="mt-10 text-center font-bold text-gray-500 relative z-10">
                    Already a member?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                        Sign in here
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
