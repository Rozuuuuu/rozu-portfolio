import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/useDarkMode';
// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = ({ revealed }) => {
    const { dark, toggle } = useDarkMode();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {revealed && (
                <m.header
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-300 ${
                        isScrolled 
                            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800 shadow-sm' 
                            : 'bg-transparent border-b border-transparent'
                    }`}
                >
                    <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-5 md:px-8">
                        {/* Logo — Home Anchor */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 group"
                            aria-label="Go to homepage"
                        >
                            {/* [PERF FIX 4] Image lazy loading and dimensions */}
                            <img
                                src="/logo.png"
                                alt="Lloyd Rosales"
                                className="h-7 w-auto dark:invert transition-all duration-300 group-hover:scale-105"
                                width="48"
                                height="48"
                                decoding="async"
                                loading="lazy"
                            />
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggle}
                            aria-label="Toggle dark mode"
                            className="relative w-10 h-10 flex items-center justify-center rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-200"
                        >
                            <m.span
                                key={dark ? 'sun' : 'moon'}
                                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="w-5 h-5 flex items-center justify-center"
                            >
                                {dark ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
                                        <rect width="256" height="256" fill="none"></rect>
                                        <circle cx="128" cy="128" r="60" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                                        <line x1="128" y1="36" x2="128" y2="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                                        <line x1="128" y1="240" x2="128" y2="220" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                                        <line x1="36" y1="128" x2="16" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                                        <line x1="240" y1="128" x2="220" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                                        <line x1="62.94132" y1="62.94132" x2="48.79898" y2="48.79898" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                                        <line x1="207.20102" y1="207.20102" x2="193.05868" y2="193.05868" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                                        <line x1="62.94132" y1="193.05868" x2="48.79898" y2="207.20102" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                                        <line x1="207.20102" y1="48.79898" x2="193.05868" y2="62.94132" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
                                        <rect width="256" height="256" fill="none"></rect>
                                        <path d="M216.71186,152.60741A92.01633,92.01633,0,1,1,103.39257,39.28812,92.00762,92.00762,0,0,0,216.71186,152.60741Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                                    </svg>
                                )}
                            </m.span>
                        </button>
                    </div>
                </m.header>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
