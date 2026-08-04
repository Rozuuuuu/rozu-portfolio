import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Renders text clamped to a few lines with a "Show more / Show less" toggle.
 * The toggle only appears when the text is actually long enough to overflow,
 * so short descriptions render normally with no button.
 */
const ExpandableText = ({ text, className = '', clampClass = 'line-clamp-3' }) => {
    const [expanded, setExpanded] = useState(false);
    const [overflowing, setOverflowing] = useState(false);
    const ref = useRef(null);

    const measure = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        // Compare only while clamped; the +1 guards against sub-pixel rounding.
        if (!expanded) setOverflowing(el.scrollHeight > el.clientHeight + 1);
    }, [expanded]);

    useEffect(() => {
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [measure, text]);

    return (
        <div>
            <p ref={ref} className={`${className} ${expanded ? '' : clampClass}`}>
                {text}
            </p>
            {(overflowing || expanded) && (
                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="mt-2 text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                    {expanded ? 'Show less' : 'Show more'}
                </button>
            )}
        </div>
    );
};

export default ExpandableText;
