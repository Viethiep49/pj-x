import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col bg-clay-background font-nunito selection:bg-primary/20 overflow-x-hidden">
            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-grow"
                >
                    <Outlet />
                </motion.main>
            </AnimatePresence>
        </div>
    );
};

export default MainLayout;
