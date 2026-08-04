import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Scroll-spy section rail — a fixed vertical set of tick marks on the right edge.
 * Each tick maps to a homepage section; the active one (based on scroll position)
 * is highlighted, and section labels slide out on hover. Clicking a tick smoothly
 * scrolls to that section. Desktop-only (xl+), where the narrowed content leaves
 * room in the right margin so it never overlaps the content column.
 */
const SECTIONS = [
    { id: 'home', label: 'Intro' },
    { id: 'projects', label: 'Projects' },
    { id: 'impact', label: 'Impact' },
    { id: 'activity', label: 'Activity' },
    { id: 'experience', label: 'Experience' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'objectives', label: 'Objectives' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'connect', label: 'Connect' },
];

const NAV_OFFSET = 90; // fixed navbar (56px) + breathing room

const SectionRail = () => {
    const [active, setActive] = useState('home');
    const rafRef = useRef(null);

    const recompute = useCallback(() => {
        const y = window.scrollY + NAV_OFFSET;
        let current = SECTIONS[0].id;
        for (const s of SECTIONS) {
            const el = document.getElementById(s.id);
            if (!el) continue;
            const top = el.getBoundingClientRect().top + window.scrollY;
            if (top <= y) current = s.id;
        }
        setActive(current);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                recompute();
            });
        };
        recompute();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [recompute]);

    const go = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - (NAV_OFFSET - 30);
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <nav
            aria-label="Page sections"
            className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3.5 group/rail"
        >
            {SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                    <button
                        key={s.id}
                        type="button"
                        onClick={() => go(s.id)}
                        aria-current={isActive ? 'true' : undefined}
                        title={s.label}
                        className="flex items-center justify-end gap-2.5 group/item"
                    >
                        <span
                            className={`whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider bg-white/70 dark:bg-black/60 backdrop-blur-sm opacity-0 translate-x-1 transition-all duration-300 group-hover/rail:opacity-100 group-hover/rail:translate-x-0 ${
                                isActive
                                    ? 'text-black dark:text-white'
                                    : 'text-neutral-400 dark:text-neutral-500 group-hover/item:text-black dark:group-hover/item:text-white'
                            }`}
                        >
                            {s.label}
                        </span>
                        <span
                            className={`h-[2px] rounded-full transition-all duration-300 ${
                                isActive
                                    ? 'w-6 bg-black dark:bg-white'
                                    : 'w-3.5 bg-neutral-300 dark:bg-neutral-700 group-hover/item:w-5 group-hover/item:bg-neutral-500 dark:group-hover/item:bg-neutral-400'
                            }`}
                        />
                    </button>
                );
            })}
        </nav>
    );
};

export default SectionRail;
