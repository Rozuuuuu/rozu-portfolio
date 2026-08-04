import { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { useDarkMode } from '../context/useDarkMode';

/**
 * ContributionGraph
 *
 * Terminal-style card that fetches the GitHub contribution calendar from the
 * server-side /api/contributions endpoint (no token touches the client) and
 * renders it as a heatmap.
 *
 * Cells use a grayscale ramp keyed to that day's contribution count — the more
 * you shipped, the brighter the cell. Dark theme runs black → gray → white;
 * light theme inverts to white → gray → black so intensity always reads as
 * "further from the background." No new hues, staying inside the monochrome
 * identity.
 */

// Map a day's contribution count to one of five intensity levels (0..4).
const levelFor = (count) => {
    if (count <= 0) return 0;
    if (count < 3) return 1;
    if (count < 6) return 2;
    if (count < 10) return 3;
    return 4;
};

// Grayscale ramps. Index = intensity level.
const RAMP_DARK = ['#161616', '#454545', '#7a7a7a', '#b8b8b8', '#ffffff']; // black → white
const RAMP_LIGHT = ['#e6e6e6', '#b8b8b8', '#7a7a7a', '#454545', '#000000']; // white → black

/* macOS-style traffic-light dots + filename, matching the site's terminal cards. */
const TerminalHeader = ({ label }) => (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
        <span className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        </span>
        <span className="ml-2 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 tracking-wide">
            {label}
        </span>
    </div>
);

const ContributionGraph = () => {
    const { dark } = useDarkMode();
    const ramp = dark ? RAMP_DARK : RAMP_LIGHT;

    const [state, setState] = useState({ status: 'loading', data: null, error: null });

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch('/api/contributions');
                // Read as text first so a non-JSON body (e.g. the serverless
                // function not running under plain `vite dev`) yields a clean
                // message instead of a raw "Unexpected token" parse error.
                const raw = await res.text();
                let json = null;
                try {
                    json = JSON.parse(raw);
                } catch {
                    if (!cancelled) {
                        setState({
                            status: 'error',
                            data: null,
                            error: res.ok
                                ? 'contributions API returned non-JSON — deploy the function or run `vercel dev` locally'
                                : `HTTP ${res.status}`,
                        });
                    }
                    return;
                }

                if (cancelled) return;
                if (!res.ok) {
                    setState({ status: 'error', data: null, error: json?.error || `HTTP ${res.status}` });
                    return;
                }
                setState({ status: 'success', data: json, error: null });
            } catch (err) {
                if (!cancelled) {
                    setState({ status: 'error', data: null, error: err?.message || 'Network error' });
                }
            }
        })();
        return () => { cancelled = true; };
    }, []);

    // Chunk the flat day list into columns of 7 (one week per column).
    const weeks = [];
    if (state.data?.days) {
        for (let i = 0; i < state.data.days.length; i += 7) {
            weeks.push(state.data.days.slice(i, i + 7));
        }
    }

    return (
        <section className="py-16 max-w-5xl mx-auto px-6 md:px-8" id="activity">
            <ScrollReveal>
                {/* Section header — mirrors the other homepage sections */}
                <div className="mb-12">
                    <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs font-mono">
                        Consistency
                    </span>
                    <h2 className="text-3xl font-black tracking-tight mt-2 text-black dark:text-white">
                        Build Activity
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-xl text-sm leading-relaxed">
                        A year of public GitHub contributions — pulled live, server-side, and rendered in the site's own palette.
                    </p>
                </div>

                {/* Terminal card */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-hidden font-mono">
                    <TerminalHeader label="lloyd@github ~ /contributions" />

                    <div className="p-5 sm:p-6">
                        {state.status === 'loading' && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                <span className="text-neutral-400 dark:text-neutral-600">$</span> fetch --contributions
                                <span className="inline-block ml-1 animate-pulse">...</span>
                            </p>
                        )}

                        {state.status === 'error' && (
                            <div className="text-sm">
                                <p className="text-neutral-500 dark:text-neutral-400">
                                    <span className="text-neutral-400 dark:text-neutral-600">$</span> fetch --contributions
                                </p>
                                <p className="mt-1 text-black dark:text-white break-words">
                                    ✗ {state.error}
                                </p>
                            </div>
                        )}

                        {state.status === 'success' && (
                            <>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5 text-center">
                                    <span className="text-black dark:text-white font-bold">{state.data.total.toLocaleString()}</span> contributions in the last year
                                </p>

                                {/* Heatmap — centered; scrolls horizontally on small screens */}
                                <div className="overflow-x-auto pb-2">
                                    <div className="flex gap-[3px] w-max mx-auto">
                                        {weeks.map((week, wi) => (
                                            <div key={wi} className="flex flex-col gap-[3px]">
                                                {week.map((day, di) => (
                                                    <div
                                                        key={di}
                                                        className="w-[11px] h-[11px] rounded-full"
                                                        style={{ backgroundColor: ramp[levelFor(day?.contributionCount ?? 0)] }}
                                                        title={`${day.contributionCount} on ${day.date}`}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-neutral-400 dark:text-neutral-500">
                                    <span>less</span>
                                    {ramp.map((color, i) => (
                                        <span
                                            key={i}
                                            className="w-[11px] h-[11px] rounded-full"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                    <span>more</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default ContributionGraph;
