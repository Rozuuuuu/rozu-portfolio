import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ revealed, onOpenMenu, onOpenChat }) => {
    const { dark, toggle } = useDarkMode();
    const location = useLocation();
    const active = location.pathname;

    const navItems = [
        {
            type: 'link',
            to: '/',
            label: 'Home',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <path d="M213.3815,109.61945,133.376,36.88436a8,8,0,0,0-10.76339.00036l-79.9945,72.73477A8,8,0,0,0,40,115.53855V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V115.53887A8,8,0,0,0,213.3815,109.61945Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
            )
        },
        {
            type: 'button',
            onClick: onOpenChat,
            label: 'Chat',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <path d="M45.42853,176.99811A95.95978,95.95978,0,1,1,79.00228,210.5717l.00023-.001L45.84594,220.044a8,8,0,0,1-9.89-9.89l9.47331-33.15657Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                    <line x1="96" y1="112" x2="160" y2="112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                    <line x1="96" y1="144" x2="160" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                </svg>
            )
        },
        {
            type: 'button',
            onClick: toggle,
            label: 'Theme',
            icon: dark ? (
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
            )
        },
        {
            type: 'button',
            onClick: onOpenMenu,
            label: 'Menu',
            icon: (
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
            )
        }
    ];

    return (
        <AnimatePresence>
            {revealed && (
                <motion.nav
                    initial={{ y: 100, opacity: 0, x: "-50%" }}
                    animate={{ y: 0, opacity: 1, x: "-50%" }}
                    exit={{ y: 100, opacity: 0, x: "-50%" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed bottom-6 md:bottom-8 left-1/2 z-50 pointer-events-auto w-[calc(100%-2rem)] sm:w-auto max-w-fit"
                >
                    <div className="flex justify-center p-1.5 sm:p-2 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl rounded-[1rem] shadow-[0_10px_25px_0_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_0_rgba(0,0,0,0.5)] border border-neutral-200/50 dark:border-neutral-800 gap-1">
                        {navItems.map((item, index) => {
                            const isActive = item.type === 'link' && active === item.to;
                            const isLink = item.type === 'link';
                            
                            const className = `group inline-flex justify-center items-center h-[45px] sm:h-[50px] rounded-lg relative z-10 overflow-hidden origin-left transition-all duration-200 ease-in
                            ${isActive
                                    ? 'w-[90px] min-[400px]:w-[110px] sm:w-[130px] text-black dark:text-white'
                                    : 'w-[45px] min-[400px]:w-[55px] sm:w-[70px] text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:w-[90px] min-[400px]:hover:w-[110px] sm:hover:w-[130px] focus:outline-none'
                                }
                            `;

                            const content = (
                                <>
                                    {/* Slide Background using Framer Motion LayoutId for active link */}
                                    {isActive && (
                                        <motion.span 
                                            layoutId="nav-pill"
                                            className="absolute -z-10 rounded-lg w-full h-full top-0 bg-black/10 dark:bg-white/10"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                    {/* Fallback hover background for non-active links/buttons */}
                                    {!isActive && (
                                        <span className="absolute -z-10 rounded-lg w-full h-full top-0 origin-right transition-transform duration-200 ease-in translate-x-full bg-neutral-100 dark:bg-neutral-800 group-hover:translate-x-0 group-focus:translate-x-0" />
                                    )}

                                    {/* Icon */}
                                    <span className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 absolute left-[15.5px] sm:left-[21px] flex items-center justify-center">
                                        {item.icon}
                                    </span>

                                    {/* Text */}
                                    <span className={`block text-center w-full pl-6 sm:pl-7 origin-right font-['Public_Sans'] font-bold text-[11px] sm:text-sm tracking-wide transition-all duration-200 ease-in
                                        ${isActive
                                            ? 'translate-x-0 opacity-100'
                                            : 'translate-x-[100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100'
                                        }
                                    `}>
                                        {item.label}
                                    </span>
                                </>
                            );

                            return isLink ? (
                                <Link key={index} to={item.to} className={className}>
                                    {content}
                                </Link>
                            ) : (
                                <button key={index} onClick={item.onClick} aria-label={item.label} className={className}>
                                    {content}
                                </button>
                            );
                        })}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
