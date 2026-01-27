import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-clay font-fredoka font-bold transition-all focus:outline-none shadow-clay-sm';

    const variants = {
        primary: 'bg-primary text-white border-b-4 border-primary-dark',
        secondary: 'bg-secondary text-white border-b-4 border-secondary-dark',
        outline: 'bg-white border-2 border-primary text-primary',
        peach: 'bg-peach text-primary-dark border-b-4 border-peach-dark',
        danger: 'bg-red-500 text-white border-b-4 border-red-700'
    };

    return (
        <motion.button
            whileHover={{ y: -4, scale: 1.02, boxShadow: 'var(--tw-shadow-clay-puffy)' }}
            whileTap={{ y: 0, scale: 0.95, boxShadow: 'var(--tw-shadow-clay-inner)' }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
