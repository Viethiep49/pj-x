import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-clay-background font-nunito flex items-center justify-center p-6 relative overflow-hidden">
            {/* Organic Background Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 45, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-peach/20 rounded-full blur-[80px] -z-10"
            />
            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    rotate: [0, -45, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-lavender/20 rounded-full blur-[80px] -z-10"
            />

            <div className="w-full max-w-lg z-10">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
