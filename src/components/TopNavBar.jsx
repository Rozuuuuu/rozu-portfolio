import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const TopNavBar = () => {
    const location = useLocation();
    const active = location.pathname;
    const { dark, toggle } = useDarkMode();
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
        { to: '/', label: 'Home' },
        { to: '/projects', label: 'Projects' },
        { to: '/achievements', label: 'Achievements' },
        { to: '/skills', label: 'Skills' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <>
            <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
                <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8 h-20">
                    {/* Logo */}
                    <Link to="/" className="font-headline text-xl md:text-2xl font-black tracking-tighter text-black dark:text-white transition-colors duration-300">
                        Rozu
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8 font-['Public_Sans'] text-sm tracking-wide">
                        {links.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`font-medium transition-colors duration-300 ${active === to
                                        ? 'text-black dark:text-white font-bold border-b-2 border-black dark:border-white pb-1'
                                        : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggle}
                            aria-label="Toggle dark mode"
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-xl">
                                {dark ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>

                        <button className="hidden sm:block bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-lg font-['Public_Sans'] text-sm font-bold active:opacity-80 active:scale-95 transition-all">
                            Contact Me
                        </button>

                        <button
                            onClick={() => setMobileOpen(o => !o)}
                            aria-label="Open menu"
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white transition-all"
                        >
                            <span className="material-symbols-outlined">
                                {mobileOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile drawer */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-6 pb-6 pt-2 flex flex-col gap-1 bg-white/95 dark:bg-black/95 border-t border-neutral-200 dark:border-neutral-800">
                        {links.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setMobileOpen(false)}
                                className={`px-4 py-3 rounded-lg text-sm font-['Public_Sans'] font-medium transition-colors duration-200 ${active === to
                                        ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white font-bold'
                                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                        <button className="mt-2 bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-lg font-['Public_Sans'] text-sm font-bold">
                            Contact Me
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default TopNavBar;
