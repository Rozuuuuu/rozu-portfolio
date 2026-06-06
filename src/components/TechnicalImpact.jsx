import React from 'react';
import ScrollReveal from './ScrollReveal';

// [EDIT] Technical Impact — real metric cards + count-up
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
    const [started, setStarted] = React.useState(false);

    React.useEffect(() => {
        const reduced =
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) { setStarted(true); return; }
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
    }, []);

    const projectsVal    = useCountUp(15, 1800, started);
    const aiVal          = useCountUp(8,  1600, started);
    const deploymentsVal = useCountUp(4,  1400, started);

    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="impact">
            <ScrollReveal>
                {/* Section header */}
                <div className="mb-16">
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

                {/* [EDIT] Technical Impact — real metric cards + count-up */}
                <div ref={gridRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Card 1 */}
                    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-5">
                        <div className="text-xs uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400">
                            Projects shipped
                        </div>
                        <div className="text-4xl font-semibold tabular-nums text-neutral-900 dark:text-white">
                            {Math.round(projectsVal)}<span>+</span>
                        </div>
                        <div className="text-sm mt-2 text-neutral-500 dark:text-neutral-400">
                            web, mobile, .NET & automation
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-5">
                        <div className="text-xs uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400">
                            AI / ML integrations
                        </div>
                        <div className="text-4xl font-semibold tabular-nums text-neutral-900 dark:text-white">
                            {Math.round(aiVal)}<span>+</span>
                        </div>
                        <div className="text-sm mt-2 text-neutral-500 dark:text-neutral-400">
                            OpenAI, Gemini, LangChain, Ollama & more
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-5">
                        <div className="text-xs uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400">
                            Live deployments
                        </div>
                        <div className="text-4xl font-semibold tabular-nums text-neutral-900 dark:text-white">
                            {Math.round(deploymentsVal)}<span> platforms</span>
                        </div>
                        <div className="text-sm mt-2 text-neutral-500 dark:text-neutral-400">
                            Vercel, OnRender, GoDaddy, Hostinger
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-5">
                        <div className="text-xs uppercase tracking-widest mb-2 text-neutral-500 dark:text-neutral-400">
                            Responsive builds
                        </div>
                        <div className="text-4xl font-semibold tabular-nums text-neutral-900 dark:text-white">
                            Mobile + tablet
                        </div>
                        <div className="text-sm mt-2 text-neutral-500 dark:text-neutral-400">
                            tested across all screen sizes
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default TechnicalImpact;
