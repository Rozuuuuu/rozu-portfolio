import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const SharedNav = () => {
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
            <nav className="fixed top-0 w-full z-50 bg-[#fff8f7]/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-[#291714]/5 dark:border-white/5 transition-colors duration-300">
                <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8 h-20">
                    {/* Logo */}
                    <Link to="/" className="font-['Epilogue'] text-xl md:text-2xl font-black tracking-tighter text-[#291714] dark:text-stone-100 transition-colors duration-300">
                        Rozu
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8 font-['Public_Sans'] text-sm tracking-wide">
                        {links.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`font-medium transition-colors duration-300 ${active === to
                                        ? 'text-[#bc000a] font-bold border-b-2 border-[#bc000a] pb-1'
                                        : 'text-[#291714] dark:text-stone-400 hover:text-[#bc000a] dark:hover:text-[#bc000a]'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side: dark toggle + contact */}
                    <div className="flex items-center gap-3">
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggle}
                            aria-label="Toggle dark mode"
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container dark:bg-stone-800 text-on-surface dark:text-stone-200 hover:bg-surface-container-high dark:hover:bg-stone-700 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-xl">
                                {dark ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>

                        {/* Contact button (hidden on very small) */}
                        <button className="hidden sm:block bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2.5 rounded-lg font-['Public_Sans'] text-sm font-bold active:opacity-80 active:scale-95 transition-all">
                            Contact Me
                        </button>

                        {/* Hamburger (mobile only) */}
                        <button
                            onClick={() => setMobileOpen(o => !o)}
                            aria-label="Open menu"
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container dark:bg-stone-800 text-on-surface dark:text-stone-200 transition-all"
                        >
                            <span className="material-symbols-outlined">
                                {mobileOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile drawer */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-6 pb-6 pt-2 flex flex-col gap-1 bg-[#fff8f7]/95 dark:bg-stone-950/95 border-t border-[#291714]/5 dark:border-white/5">
                        {links.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setMobileOpen(false)}
                                className={`px-4 py-3 rounded-lg text-sm font-['Public_Sans'] font-medium transition-colors duration-200 ${active === to
                                        ? 'bg-primary/10 text-[#bc000a] font-bold'
                                        : 'text-[#291714] dark:text-stone-300 hover:bg-surface-container dark:hover:bg-stone-800'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                        <button className="mt-2 bg-gradient-to-br from-primary to-primary-container text-white px-5 py-3 rounded-lg font-['Public_Sans'] text-sm font-bold">
                            Contact Me
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default SharedNav;
