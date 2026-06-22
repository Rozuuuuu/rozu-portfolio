import { useEffect, useState } from 'react';
// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../context/useDarkMode';

/**
 * LogoPreloader
 * 
 * Adapted from the Framer LogoPreloader pattern.
 * Phase system: init → loading → logoOut → done
 * Uses /logo.png with premium cubic-bezier easing.
 */
const LogoPreloader = ({ onComplete }) => {
    const [phase, setPhase] = useState('init');
    const { dark: isDark } = useDarkMode();

    useEffect(() => {
        // Phase 1: Logo enters from below
        const t0 = setTimeout(() => setPhase('loading'), 50);

        // Phase 2: Hold, then animate logo out upward
        const t1 = setTimeout(() => setPhase('logoOut'), 2000);

        // Phase 3: Background fades, preloader unmounts
        const t2 = setTimeout(() => {
            setPhase('done');
            onComplete?.();
        }, 2700);

        return () => {
            clearTimeout(t0);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <m.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.7, 0.2, 0.2, 1] }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'all',
                        overflow: 'hidden',
                        backgroundColor: isDark ? '#000000' : '#FFFFFF',
                    }}
                    aria-label="Loading"
                    role="status"
                >
                    {/* Subtle grid pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: isDark 
                                ? 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)'
                                : 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Logo */}
                    {/* [PERF FIX 4] Image lazy loading and dimensions */}
                    <m.img
                        src="/logo.png"
                        alt="Rozu Logo"
                        draggable={false}
                        initial={{ y: 80, opacity: 0 }}
                        animate={
                            phase === 'init'
                                ? { y: 80, opacity: 0 }
                                : phase === 'loading'
                                ? { y: 0, opacity: 1 }
                                : { y: -80, opacity: 0 }
                        }
                        transition={{
                            duration: 0.7,
                            ease: [0.7, 0.2, 0.2, 1],
                        }}
                        width="80"
                        height="80"
                        decoding="async"
                        style={{
                            width: 80,
                            height: 80,
                            objectFit: 'contain',
                            willChange: 'transform, opacity',
                            userSelect: 'none',
                            zIndex: 1,
                            filter: isDark ? 'invert(1)' : 'none', // White on black, Black on white
                        }}
                    />

                    {/* Loading bar */}
                    <div 
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-[2px] overflow-hidden rounded-full"
                        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                    >
                        {/* [PERF FIX 5] Non-composited animation fix (width -> scaleX) */}
                        <m.div
                            className="h-full"
                            style={{ 
                                backgroundColor: isDark ? '#FFFFFF' : '#000000',
                                width: '100%',
                                transformOrigin: 'left'
                            }}
                            initial={{ scaleX: 0 }}
                            animate={
                                phase === 'loading' || phase === 'logoOut'
                                    ? { scaleX: 1 }
                                    : { scaleX: 0 }
                            }
                            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default LogoPreloader;
