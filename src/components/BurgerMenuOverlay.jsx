import { Link } from 'react-router-dom';
// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m, AnimatePresence } from 'framer-motion';

const menuLinks = [
    { to: '/projects', label: 'Projects', num: '01' },
    { to: '/achievements', label: 'Achievements', num: '02' },
    { to: '/skills', label: 'Skills', num: '03' },
    { to: '/contact', label: 'Contact', num: '04' },
];

/* ─── Animation Variants ─── */
const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, transition: { duration: 0.25, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] } },
};

const navContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.04,
            staggerDirection: -1,
        },
    },
};

const navItemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
        y: -30,
        opacity: 0,
        transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
};

/**
 * BurgerMenuOverlay
 * 
 * Full-screen monochromatic navigation overlay with staggered
 * Framer Motion entrance animations. Pure B&W design.
 */
const BurgerMenuOverlay = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <m.div
                    key="burger-overlay"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[9998] bg-white dark:bg-black flex flex-col"
                    aria-label="Navigation menu"
                    role="dialog"
                >
                    {/* Close button */}
                    <div className="flex justify-end px-6 md:px-10 pt-6 md:pt-8">
                        <button
                            onClick={onClose}
                            aria-label="Close menu"
                            className="w-12 h-12 flex items-center justify-center rounded-lg text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <m.nav
                        variants={navContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex-1 flex flex-col justify-center px-10 md:px-20 lg:px-32"
                    >
                        {menuLinks.map(({ to, label, num }) => (
                            <m.div key={to} variants={navItemVariants}>
                                <Link
                                    to={to}
                                    onClick={onClose}
                                    className="group flex items-baseline gap-4 md:gap-6 py-4 md:py-5 border-b border-neutral-200 dark:border-neutral-800 transition-colors hover:border-black dark:hover:border-white"
                                >
                                    <span className="font-mono text-xs md:text-sm text-neutral-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors tracking-wider">
                                        {num}
                                    </span>
                                    <span className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-black dark:text-white uppercase leading-none group-hover:translate-x-4 transition-transform duration-300">
                                        {label}
                                    </span>
                                </Link>
                            </m.div>
                        ))}
                    </m.nav>

                    {/* Footer info */}
                    <m.div
                        variants={footerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="px-10 md:px-20 lg:px-32 pb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-500 tracking-widest uppercase">
                            code.with.lloyd@gmail.com
                        </span>
                        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
                            Cebu City, Philippines
                        </span>
                    </m.div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default BurgerMenuOverlay;
