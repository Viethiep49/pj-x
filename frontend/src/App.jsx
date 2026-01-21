import React, { useState } from 'react';
import { Camera, Zap, Image as ImageIcon, X } from 'lucide-react';
import './index.css';

// Components (Inline for simplicity, but cleaner to separate later)
const Navbar = ({ onOpenAuth }) => (
    <nav className="glass-panel" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)' /* Ensure nav opacity */
    }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    width: 40,
                    height: 40,
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px var(--primary-glow)'
                }}>
                    <Camera color="white" size={24} />
                </div>
                <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit' }}>PJ-X</span>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <button style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Features</button>
                <button style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Pricing</button>
                <button style={{ background: 'transparent', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>About</button>
            </div>

            <button
                onClick={onOpenAuth}
                style={{
                    background: 'white',
                    border: '1px solid var(--border-glass)',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '99px',
                    color: 'var(--text-main)',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.color = 'var(--primary)'; }}
                onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border-glass)'; e.target.style.color = 'var(--text-main)'; }}
            >
                Sign In
            </button>
        </div>
    </nav>
);

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(8px)', /* Lighter overlay */
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="glass-panel animate-fade-in" style={{
                width: '100%', maxWidth: '420px', padding: '2.5rem', borderRadius: '24px',
                position: 'relative', background: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-muted)', background: 'transparent' }}>
                    <X size={24} />
                </button>

                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center', color: 'var(--text-main)' }}>
                    {isLogin ? 'Welcome back' : 'Create account'}
                </h2>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
                    {isLogin ? 'Enter your details to access your workspace.' : 'Start your creative journey today.'}
                </p>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={(e) => e.preventDefault()}>
                    {!isLogin && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Full Name</label>
                            <input type="text" placeholder="John Doe" style={{
                                padding: '0.8rem 1rem', borderRadius: '12px', background: 'var(--bg-input)',
                                border: '1px solid #e2e8f0', color: 'var(--text-main)', outline: 'none'
                            }} />
                        </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email</label>
                        <input type="email" placeholder="name@example.com" style={{
                            padding: '0.8rem 1rem', borderRadius: '12px', background: 'var(--bg-input)',
                            border: '1px solid #e2e8f0', color: 'var(--text-main)', outline: 'none'
                        }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Password</label>
                        <input type="password" placeholder="••••••••" style={{
                            padding: '0.8rem 1rem', borderRadius: '12px', background: 'var(--bg-input)',
                            border: '1px solid #e2e8f0', color: 'var(--text-main)', outline: 'none'
                        }} />
                    </div>

                    <button style={{
                        marginTop: '1rem', padding: '1rem', borderRadius: '12px', fontWeight: 600,
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: 'white', transition: 'box-shadow 0.2s',
                        boxShadow: '0 4px 12px var(--primary-glow)'
                    }}>
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ color: 'var(--primary)', fontWeight: 600, background: 'transparent' }}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

const Hero = () => (
    <header style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '6rem', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                padding: '0.5rem 1rem', borderRadius: '99px', background: 'var(--bg-input)',
                border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--primary)',
                fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
                <Zap size={16} fill="currentColor" />
                <span>New AI Models Available</span>
            </div>

            <h1 style={{ fontSize: '4.5rem', color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '800px' }}>
                Transform your photos with <span className="text-gradient">AI Magic</span>
            </h1>

            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.6 }}>
                Professional image processing tools powered by next-generation AI. Enhance, remove backgrounds, and upscale in seconds.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{
                    padding: '1rem 2.5rem', borderRadius: '99px', fontSize: '1.1rem', fontWeight: 600,
                    background: 'var(--text-main)', color: 'white', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
                }}>
                    Start Creating
                </button>
                <button style={{
                    padding: '1rem 2.5rem', borderRadius: '99px', fontSize: '1.1rem', fontWeight: 600,
                    background: 'white', border: '1px solid #e2e8f0', color: 'var(--text-main)',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                }}>
                    View Gallery
                </button>
            </div>

            <div className="glass-panel" style={{
                marginTop: '5rem', width: '100%', maxWidth: '1000px', height: '600px',
                borderRadius: '24px', position: 'relative', overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.4)',
                border: '1px solid rgba(255,255,255,0.6)'
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <ImageIcon size={64} style={{ color: '#94a3b8', marginBottom: '1rem', opacity: 0.8 }} />
                        <p style={{ color: 'var(--text-muted)' }}>Interactive Demo Placeholder</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

function App() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <>
            <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
            <Hero />
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
}

export default App;
