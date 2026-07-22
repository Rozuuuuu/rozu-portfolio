import { useState } from 'react';
import { Link } from 'react-router-dom';
// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import HoverScrollImage from './HoverScrollImage';
import projects from '../data/projectsData';
import Icon from './Icon';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    
    const filters = ['All', 'Full-Stack', 'Frontend', 'E-Commerce', 'AI/ML'];

    // Show first 3 projects on homepage
    const displayProjects = activeFilter === 'All' 
        ? projects.slice(0, 3) 
        : projects.filter(card => card.tag === activeFilter).slice(0, 3);

    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="projects">
            <ScrollReveal>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs">Recent Work</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 text-black dark:text-white">Featured Projects</h2>
                    </div>
                    
                    {/* Filters with Context Transition */}
                    <div className="flex gap-2 p-1 bg-neutral-50 dark:bg-neutral-900 rounded-xl max-w-fit border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`relative px-4 py-2 min-h-[44px] text-sm font-bold rounded-lg transition-colors z-10 ${
                                    activeFilter === filter
                                        ? 'text-white dark:text-black'
                                        : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                                }`}
                            >
                                {activeFilter === filter && (
                                    <m.span
                                        layoutId="filter-pill"
                                        className="absolute inset-0 bg-black dark:bg-white rounded-lg -z-10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <m.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <AnimatePresence mode="popLayout">
                        {displayProjects.map(({ slug, tag, img, media, title, desc, decisions, metrics }) => (
                            <m.div 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={slug} 
                                className="group bg-white dark:bg-neutral-950 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-800"
                            >
                                <div className="relative">
                                    {media?.type === 'video' ? (
                                        <div className="h-64 overflow-hidden">
                                            <video
                                                className="w-full h-full object-cover"
                                                src={media.src}
                                                muted
                                                loop
                                                playsInline
                                                onMouseEnter={e => e.target.play()}
                                                onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }}
                                            />
                                        </div>
                                    ) : img ? (
                                        <HoverScrollImage src={img} alt={title} />
                                    ) : (
                                        <div className="h-64 w-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 dark:from-neutral-800 dark:via-neutral-850 dark:to-neutral-900">
                                            <Icon name="code" className="text-4xl text-neutral-400 dark:text-neutral-600 mb-2" />
                                            <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-500 uppercase tracking-widest">{title}</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-black dark:bg-white px-3 py-1 text-[10px] text-white dark:text-black font-bold uppercase tracking-tighter">{tag}</span>
                                    </div>
                                    {media?.type === 'video' && (
                                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                                            <Icon name="play_arrow" className="text-white text-sm" />
                                            <span className="text-white text-[10px] font-bold uppercase tracking-wide">Demo</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-xl font-black mb-3 text-black dark:text-white">{title}</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6 leading-relaxed">{desc}</p>

                                    {/* Key engineering decisions (real tradeoffs) */}
                                    {decisions?.length > 0 && (
                                        <div className="mb-6">
                                            <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                                                Decisions
                                            </span>
                                            <ul className="space-y-2">
                                                {decisions.map((d, i) => (
                                                    <li key={i} className="flex gap-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                                        <span aria-hidden="true" className="mt-[2px] text-neutral-400 dark:text-neutral-600 font-mono">→</span>
                                                        <span>{d}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Terminal-style metrics readout */}
                                    {metrics?.length > 0 && (
                                        <div className="mt-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black overflow-hidden font-mono">
                                            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                                                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                                                <span className="ml-2 text-[10px] text-white/40 tracking-wide">metrics.log</span>
                                            </div>
                                            <div className="p-3 space-y-1">
                                                {metrics.map((m) => (
                                                    <div key={m.label} className="flex items-baseline justify-between text-[11px]">
                                                        <span className="text-white/45">{m.label}</span>
                                                        <span className="text-white font-bold">{m.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </m.div>
                        ))}
                    </AnimatePresence>
                </m.div>
                
                <div className="flex justify-center">
                    <Link to="/projects" className="px-8 py-4 min-h-[44px] border-2 border-black dark:border-white text-black dark:text-white font-bold rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all flex items-center gap-3">
                        View All Projects
                        <Icon name="grid_view" />
                    </Link>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Projects;
