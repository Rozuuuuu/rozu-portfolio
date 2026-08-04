import { useState, useRef, useLayoutEffect, useCallback } from 'react';

/**
 * Renders text clamped to a few lines with an animated "Show more / Show less"
 * toggle. The container's max-height animates between the collapsed (N-line)
 * height and the full content height, so expanding/collapsing glides instead
 * of snapping. The toggle only appears when the text actually overflows.
 */
const CLAMP_LINES = 3;

const ExpandableText = ({ text, className = '' }) => {
    const [expanded, setExpanded] = useState(false);
    const [heights, setHeights] = useState({ collapsed: null, full: null });
    const ref = useRef(null);

    const measure = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        const cs = getComputedStyle(el);
        let lineHeight = parseFloat(cs.lineHeight);
        if (Number.isNaN(lineHeight)) lineHeight = parseFloat(cs.fontSize) * 1.5;
        setHeights({
            collapsed: Math.round(lineHeight * CLAMP_LINES),
            full: el.scrollHeight, // scrollHeight ignores max-height, so it's always the true content height
        });
    }, []);

    // Measure before paint so the first frame is already collapsed (no flash).
    useLayoutEffect(() => {
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [measure, text]);

    const overflowing =
        heights.full != null && heights.collapsed != null && heights.full > heights.collapsed + 1;

    const maxHeight =
        heights.collapsed == null
            ? undefined
            : expanded || !overflowing
                ? heights.full
                : heights.collapsed;

    return (
        <div>
            <p
                ref={ref}
                className={className}
                style={{
                    overflow: 'hidden',
                    maxHeight: maxHeight != null ? `${maxHeight}px` : undefined,
                    transition: 'max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
            >
                {text}
            </p>
            {overflowing && (
                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                    {expanded ? 'Show less' : 'Show more'}
                    <span
                        aria-hidden="true"
                        className="transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                        style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
                    >
                        ▾
                    </span>
                </button>
            )}
        </div>
    );
};

export default ExpandableText;
