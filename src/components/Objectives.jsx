import { useRef } from 'react';
// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const objectives = [
    {
        id: 'scalability',
        icon: 'cloud',
        title: 'Full-Stack Delivery',
        description: 'Building applications end to end — from database schema and API design to responsive, accessible front-ends — with clean, modular structure so features grow without rewrites.',
    },
    {
        id: 'performance',
        icon: 'speed',
        title: 'Performance-Minded',
        description: 'Treating load time as a feature: lazy-loaded routes, optimized images, and code-splitting are defaults in how I build, not afterthoughts.',
    },
    {
        id: 'excellence',
        icon: 'verified_user',
        title: 'Ship With Discipline',
        description: 'Working in version control with CI lint/build checks and automated deploys, so every change is traceable, reviewable, and reversible.',
    },
];

const ObjectiveCard = ({ objective, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <m.div
            ref={ref}
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group relative"
        >
            <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-8 md:p-10 h-full backdrop-blur-sm transition-all duration-300 hover:border-black dark:hover:border-white hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5">
                
                {/* Accent glow on hover */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Number index */}
                <span className="font-mono text-[10px] font-bold text-neutral-300 dark:text-neutral-700 tracking-widest uppercase mb-6 block">
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-6 group-hover:bg-black group-hover:dark:bg-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-black dark:text-white text-lg group-hover:text-white group-hover:dark:text-black transition-colors duration-300">
                        {objective.icon}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-headline text-lg font-black tracking-tight text-black dark:text-white mb-3">
                    {objective.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {objective.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </m.div>
    );
};

const Objectives = () => {
    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="objectives">
            <ScrollReveal>
                {/* Section header */}
                <div className="mb-16">
                    <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs font-mono">
                        Strategic Focus
                    </span>
                    <h2 className="text-4xl font-black tracking-tight mt-2 text-black dark:text-white">
                        Engineering Objectives
                    </h2>
                    {/* [EDIT] Objective — real value proposition copy */}
                    <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-xl text-sm leading-relaxed">
                        I design and ship full-stack applications across web, mobile, and automation — integrating AI and ML features using OpenAI, Gemini, LangChain, Ollama, and n8n. 15+ projects live in production, ranging from intelligent chatbots to automated workflows, .NET systems, and mobile apps.
                    </p>
                </div>

                {/* Objectives grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {objectives.map((objective, index) => (
                        <ObjectiveCard key={objective.id} objective={objective} index={index} />
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Objectives;
