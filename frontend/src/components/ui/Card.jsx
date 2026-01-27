import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', variant = 'white', ...props }) => {
    const variants = {
        white: 'bg-white',
        peach: 'bg-peach',
        cream: 'bg-cream',
        lavender: 'bg-lavender',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: 'var(--tw-shadow-clay-puffy)' }}
            className={`p-8 rounded-clay shadow-clay-md border-0 transition-all duration-300 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
