import React from 'react';
import ScrollReveal from './ScrollReveal';

// [EDIT] Technical Impact — instrument-panel readout with count-up + reveal-synced bars
function useCountUp(target, duration, shouldStart) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!shouldStart) return;
    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(eased * target);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldStart, target, duration]);
  return count;
}

const TechnicalImpact = () => {
    const gridRef = React.useRef(null);
    const [started, setStarted] = React.useState(() =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    React.useEffect(() => {
        if (started) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (gridRef.current) obs.observe(gridRef.current);
        return () => obs.disconnect();
    }, [started]);

    const projectsVal    = useCountUp(15, 1800, started);
    const aiVal          = useCountUp(8,  1600, started);
    const deploymentsVal = useCountUp(4,  1400, started);

    const metrics = [
        {
            label: 'AI / ML integrations',
            value: `${Math.round(aiVal)}`,
            unit: '+',
            caption: 'OpenAI, Gemini, LangChain, Ollama & more',
            delay: 120,
        },
        {
            label: 'Live deployments',
            value: `${Math.round(deploymentsVal)}`,
            unit: ' platforms',
            caption: 'Vercel, Render, GoDaddy, Hostinger',
            delay: 220,
        },
        {
            label: 'Responsive builds',
            value: 'Mobile',
            unit: ' + tablet',
            caption: 'tested across every screen size',
            delay: 320,
        },
    ];

    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="impact">
            <style>{`
                .ti-bar { position: relative; height: 3px; border-radius: 9999px; background: #e5e5e5; overflow: hidden; }
                .dark .ti-bar { background: #262626; }
                .ti-bar > span {
                    position: absolute;
                    inset: 0;
                    width: 0;
                    border-radius: 9999px;
                    background: #000;
                    transition: width 1.1s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .dark .ti-bar > span { background: #fff; }
                .ti-bar.filled > span { width: 100%; }
                .ti-card {
                    border: 1px solid #e5e5e5;
                    border-radius: 1rem;
                    background: #fafafa;
                    padding: 1.5rem;
                    transition: border-color 0.25s, transform 0.25s, background 0.25s;
                }
                .dark .ti-card { border-color: #1f1f1f; background: #0a0a0a; }
                .ti-card:hover { border-color: #a3a3a3; transform: translateY(-3px); }
                .dark .ti-card:hover { border-color: #525252; }
            `}</style>

            <ScrollReveal>
                {/* Section header */}
                <div className="mb-14">
                    <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs font-mono">
                        Proof of Work
                    </span>
                    <h2 className="text-4xl font-black tracking-tight mt-2 text-black dark:text-white">
                        Technical Impact
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-xl text-sm leading-relaxed">
                        Engineering metrics that speak louder than feature lists — optimized for performance, quality, and scale.
                    </p>
                </div>

                <div ref={gridRef}>
                    {/* Featured metric */}
                    <div className="ti-card mb-3 md:!p-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div>
                                <div className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 mb-4">
                                    Projects shipped
                                </div>
                                <div className="text-7xl md:text-8xl font-black tabular-nums leading-none text-black dark:text-white">
                                    {Math.round(projectsVal)}<span className="text-neutral-400 dark:text-neutral-600">+</span>
                                </div>
                            </div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 md:text-right md:max-w-[16rem] leading-relaxed">
                                Web, mobile, .NET &amp; automation — from prototype to production.
                            </p>
                        </div>
                        <div className={`ti-bar mt-6 ${started ? 'filled' : ''}`}>
                            <span style={{ transitionDelay: '0ms' }} />
                        </div>
                    </div>

                    {/* Supporting metrics */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {metrics.map((m) => (
                            <div key={m.label} className="ti-card flex flex-col">
                                <div className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4">
                                    {m.label}
                                </div>
                                <div className="text-4xl font-black tabular-nums leading-none text-black dark:text-white">
                                    {m.value}<span className="text-neutral-400 dark:text-neutral-600 text-2xl font-bold">{m.unit}</span>
                                </div>
                                <div className={`ti-bar mt-5 ${started ? 'filled' : ''}`}>
                                    <span style={{ transitionDelay: `${m.delay}ms` }} />
                                </div>
                                <p className="text-sm mt-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                    {m.caption}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default TechnicalImpact;
