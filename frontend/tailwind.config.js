export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                fredoka: ['"Fredoka"', 'sans-serif'],
                nunito: ['"Nunito"', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#FF8C00', // Sun Orange
                    light: '#FFA500',
                    dark: '#E67E00',
                    clay: '#FFF4E6',
                },
                secondary: {
                    DEFAULT: '#FFB800',
                    light: '#FFD666',
                    dark: '#B88600',
                },
                peach: {
                    DEFAULT: '#FFDAB9',
                    dark: '#FFC8A0',
                },
                cream: {
                    DEFAULT: '#FFFDD0',
                    dark: '#F5F5DC',
                },
                lavender: {
                    DEFAULT: '#E6E6FA',
                    dark: '#D8D8F5',
                },
                clay: {
                    background: '#FFF9F5',
                    card: '#FFFFFF',
                    accent: '#F472B6', // Pink for more playfulness
                }
            },
            boxShadow: {
                'clay-sm': 'inset -2px -2px 4px rgba(0,0,0,0.05), inset 2px 2px 4px rgba(255,255,255,0.8), 4px 4px 8px rgba(0,0,0,0.05)',
                'clay-md': 'inset -6px -6px 12px rgba(0,0,0,0.05), inset 6px 6px 12px rgba(255,255,255,0.8), 12px 12px 24px rgba(0,0,0,0.05)',
                'clay-lg': 'inset -10px -10px 20px rgba(0,0,0,0.05), inset 10px 10px 20px rgba(255,255,255,0.8), 20px 20px 40px rgba(0,0,0,0.05)',
                'clay-inner': 'inset 6px 6px 12px rgba(0,0,0,0.05), inset -6px -6px 12px rgba(255,255,255,0.8)',
                'clay-puffy': 'inset -8px -8px 16px rgba(0,0,0,0.03), inset 8px 8px 16px rgba(255,255,255,0.9), 16px 16px 32px rgba(255,140,0,0.1)',
            },
            borderRadius: {
                'clay': '2.5rem',
                'blob': '40% 60% 70% 30% / 40% 50% 60% 50%',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'squish': 'squish 0.3s ease-out',
                'blob-float': 'blob-float 10s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                squish: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0.96)' },
                    '100%': { transform: 'scale(1)' },
                },
                'blob-float': {
                    '0%, 100%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', transform: 'translate(0, 0) scale(1)' },
                    '33%': { borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%', transform: 'translate(10px, -20px) scale(1.05)' },
                    '66%': { borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%', transform: 'translate(-10px, 10px) scale(0.95)' },
                }
            }
        },
    },
    plugins: [],
}
