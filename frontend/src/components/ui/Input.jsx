import React from 'react';

const Input = ({ label, id, error, className = '', ...props }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label htmlFor={id} className="text-sm font-bold font-fredoka text-gray-700 ml-4">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`px-6 py-4 border-0 bg-cream/70 rounded-clay shadow-clay-inner focus:outline-none focus:ring-4 focus:ring-primary-light/10 transition-all font-nunito placeholder:text-gray-400 ${error ? 'ring-2 ring-red-500' : ''
                    }`}
                {...props}
            />
            {error && <span className="text-xs text-red-500 ml-4 font-bold">{error}</span>}
        </div>
    );
};

export default Input;
