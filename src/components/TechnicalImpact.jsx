import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const metrics = [
    {
        id: 'projects',
        value: '5+',
        label: 'Star Projects',
        detail: 'Tier 3 advanced full-stack applications',
        icon: 'rocket_launch',
    },
    {
        id: 'lighthouse',
        value: '98',
        suffix: '/100',
        label: 'Avg. Lighthouse Score',
        detail: 'Core Web Vitals & performance proficiency',
        icon: 'speed',
    },
    {
        id: 'coverage',
        value: '90%+',
        label: 'Test Coverage',
        detail: 'Vitest & Playwright operational excellence',
        icon: 'verified',
    },
    {
        id: 'optimization',
        value: '40%',
        label: 'Bundle Size Reduction',
        detail: 'Optimized for high-scale delivery',
        icon: 'trending_down',
    },
];

const MetricCard = ({ metric, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group relative"
        >
            {/* Card */}
            <div className="relative overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700/50 bg-white dark:bg-stone-900/80 p-8 h-full backdrop-blur-sm transition-all duration-300 hover:border-primary/40 dark:hover:border-red-500/30 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-red-500/5">

                {/* Accent glow on hover */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 dark:bg-red-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top row: icon + label */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-primary dark:text-red-400 text-lg">
                        {metric.icon}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-mono">
                        {metric.label}
                    </span>
                </div>

                {/* Big metric value */}
                <div className="mb-4">
                    <span className="text-5xl md:text-6xl font-extrabold tracking-tighter text-stone-900 dark:text-stone-50 font-mono leading-none">
                        {metric.value}
                    </span>
                    {metric.suffix && (
                        <span className="text-2xl font-bold text-stone-400 dark:text-stone-500 font-mono ml-0.5">
                            {metric.suffix}
                        </span>
                    )}
                </div>

                {/* Supporting detail */}
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                    {metric.detail}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 dark:via-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
};

const TechnicalImpact = () => {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="impact">
            <ScrollReveal>
                {/* Section header */}
                <div className="mb-16">
                    <span className="text-primary dark:text-red-400 font-bold tracking-[0.3em] uppercase text-xs font-mono">
                        Proof of Work
                    </span>
                    <h2 className="text-4xl font-black tracking-tight mt-2 dark:text-stone-100">
                        Technical Impact
                    </h2>
                    <p className="text-stone-500 dark:text-stone-400 mt-4 max-w-xl text-sm leading-relaxed">
                        Engineering metrics that speak louder than feature lists — optimized for performance, quality, and scale.
                    </p>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <MetricCard key={metric.id} metric={metric} index={index} />
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default TechnicalImpact;
