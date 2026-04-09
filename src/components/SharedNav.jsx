import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const SharedNav = () => {
    const location = useLocation();
    const active = location.pathname;
    const { dark, toggle } = useDarkMode();

    const links = [
        {
            to: '/', label: 'Home', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <path d="M213.3815,109.61945,133.376,36.88436a8,8,0,0,0-10.76339.00036l-79.9945,72.73477A8,8,0,0,0,40,115.53855V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V115.53887A8,8,0,0,0,213.3815,109.61945Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
            )
        },
        {
            to: '/projects', label: 'Projects', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <path d="M216,72H130.66667L104,48H40A16,16,0,0,0,24,64V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
            )
        },
        {
            to: '/achievements', label: 'Awards', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <circle cx="128" cy="160" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                    <polyline points="104 118.256 72 40 128 64 184 40 152 118.256" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline>
                </svg>
            )
        },
        {
            to: '/skills', label: 'Skills', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="16"></circle>
                    <path d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
            )
        },
        {
            to: '/contact', label: 'Contact', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <path d="M45.42853,176.99811A95.95978,95.95978,0,1,1,79.00228,210.5717l.00023-.001L45.84594,220.044a8,8,0,0,1-9.89-9.89l9.47331-33.15657Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                    <line x1="96" y1="112" x2="160" y2="112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                    <line x1="96" y1="144" x2="160" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                </svg>
            )
        },
    ];

    return (
        <>
            {/* Floating Expanding Navbar */}
            <nav className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                <div className="flex justify-center p-2 bg-[#fff8f7]/95 dark:bg-stone-900/95 backdrop-blur-xl rounded-[1rem] shadow-[0_10px_25px_0_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_0_rgba(0,0,0,0.5)] border border-stone-200/50 dark:border-white/5 gap-1">
                    {links.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`group inline-flex justify-center items-center h-[50px] rounded-lg relative z-10 overflow-hidden origin-left transition-all duration-200 ease-in
                            ${active === to
                                    ? 'w-[110px] sm:w-[130px] text-[#bc000a] dark:text-red-500' /* Expanded active state */
                                    : 'w-[55px] sm:w-[70px] text-stone-600 dark:text-stone-400 hover:text-[#bc000a] dark:hover:text-red-500 hover:w-[110px] sm:hover:w-[130px] focus:outline-none'
                                }
                            `}
                        >
                            {/* Slide Background */}
                            <span className={`absolute -z-10 rounded-lg w-full h-full top-0 origin-right transition-transform duration-200 ease-in
                                ${active === to
                                    ? 'translate-x-0 bg-[#bc000a]/10 dark:bg-stone-800'
                                    : 'translate-x-full bg-surface-container dark:bg-stone-800 group-hover:translate-x-0'
                                }
                            `} />

                            {/* Icon */}
                            <span className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 absolute left-[15.5px] sm:left-[21px] flex items-center justify-center">
                                {icon}
                            </span>

                            {/* Text */}
                            <span className={`block text-center w-full pl-6 sm:pl-7 origin-right font-['Public_Sans'] font-bold text-[11px] sm:text-sm tracking-wide transition-all duration-200 ease-in
                                ${active === to
                                    ? 'translate-x-0 opacity-100'
                                    : 'translate-x-[100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100'
                                }
                            `}>
                                {label}
                            </span>
                        </Link>
                    ))}

                    {/* Dark Mode Toggle Button built exactly like the links */}
                    <button
                        onClick={toggle}
                        aria-label="Toggle dark mode"
                        className="group inline-flex justify-center items-center w-[55px] sm:w-[70px] h-[50px] rounded-lg relative z-10 overflow-hidden origin-left transition-all duration-200 ease-in text-stone-600 dark:text-stone-400 hover:text-[#bc000a] dark:hover:text-red-500 hover:w-[110px] sm:hover:w-[130px] focus:outline-none"
                    >
                        {/* Slide Background */}
                        <span className="absolute -z-10 rounded-lg w-full h-full top-0 origin-right transition-transform duration-200 ease-in translate-x-full bg-surface-container dark:bg-stone-800 group-hover:translate-x-0" />

                        {/* Icon */}
                        <span className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 absolute left-[15.5px] sm:left-[21px] flex items-center justify-center">
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
                        </span>

                        {/* Text */}
                        <span className="block text-center w-full pl-6 sm:pl-7 origin-right font-['Public_Sans'] font-bold text-[11px] sm:text-sm tracking-wide transition-all duration-200 ease-in translate-x-[100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100">
                            Theme
                        </span>
                    </button>
                </div>
            </nav>
        </>
    );
};

export default SharedNav;
