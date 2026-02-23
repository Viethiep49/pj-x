import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-clay-background font-nunito selection:bg-primary/20 overflow-x-hidden">
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
