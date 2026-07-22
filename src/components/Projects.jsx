import { useState } from 'react';
import { Link } from 'react-router-dom';
// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import HoverScrollImage from './HoverScrollImage';
import projects from '../data/projectsData';
import Icon from './Icon';

const FeaturedProjectCard = ({ project }) => {
    const { tag, img, media, title, desc, decisions, metrics } = project;
    const [open, setOpen] = useState(false);
    const hasDetails = decisions?.length > 0 || metrics?.length > 0;

    return (
        <div className="group bg-white dark:bg-neutral-950 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-800">
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

                {hasDetails && (
                    <div className="mt-auto border-t border-neutral-200 dark:border-neutral-800 pt-4">
                        {/* Accordion trigger */}
                        <button
                            type="button"
                            onClick={() => setOpen(o => !o)}
                            aria-expanded={open}
                            className="w-full flex items-center justify-between gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            <span>Engineering decisions &amp; metrics</span>
                            <Icon
                                name="expand_more"
                                className={`text-base transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Accordion panel */}
                        <AnimatePresence initial={false}>
                            {open && (
                                <m.div
                                    key="panel"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-5">
                                        {/* Key engineering decisions (real tradeoffs) */}
                                        {decisions?.length > 0 && (
                                            <div className="mb-5">
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
                                            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-black overflow-hidden font-mono">
                                                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                                                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                                                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                                                    <span className="ml-2 text-[10px] text-white/40 tracking-wide">metrics.log</span>
                                                </div>
                                                <div className="p-3 space-y-1">
                                                    {metrics.map((metric) => (
                                                        <div key={metric.label} className="flex items-baseline justify-between text-[11px]">
                                                            <span className="text-white/45">{metric.label}</span>
                                                            <span className="text-white font-bold">{metric.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

const Projects = () => {
    // Featured = the first three projects. "View All Projects" links to the full list.
    const displayProjects = projects.slice(0, 3);

    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="projects">
            <ScrollReveal>
                <div className="mb-8">
                    <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs">Recent Work</span>
                    <h2 className="text-4xl font-black tracking-tight mt-2 text-black dark:text-white">Featured Projects</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {displayProjects.map((project) => (
                        <FeaturedProjectCard key={project.slug} project={project} />
                    ))}
                </div>

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
