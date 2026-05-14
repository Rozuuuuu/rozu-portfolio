import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import projects from '../data/projectsData';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    
    const filters = ['All', 'Full-Stack', 'Frontend', 'E-Commerce', 'AI/ML'];

    // Show first 6 projects on homepage
    const displayProjects = activeFilter === 'All' 
        ? projects.slice(0, 6) 
        : projects.filter(card => card.tag === activeFilter).slice(0, 6);

    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="projects">
            <ScrollReveal>
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Recent Work</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 dark:text-stone-100">Featured Projects</h2>
                    </div>
                    
                    {/* Filters with Context Transition */}
                    <div className="flex gap-2 p-1 bg-surface-container-lowest dark:bg-stone-800 rounded-xl max-w-fit border border-stone-200 dark:border-white/5 shadow-sm">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`relative px-4 py-2 text-sm font-bold rounded-lg transition-colors z-10 ${
                                    activeFilter === filter
                                        ? 'text-white dark:text-stone-900'
                                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                                }`}
                            >
                                {activeFilter === filter && (
                                    <motion.span
                                        layoutId="filter-pill"
                                        className="absolute inset-0 bg-primary dark:bg-stone-200 rounded-lg -z-10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
                    <AnimatePresence mode="popLayout">
                        {displayProjects.map(({ slug, tag, img, media, title, desc }) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={slug} 
                                className="group bg-surface-container-lowest dark:bg-stone-800 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-white/5"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    {media?.type === 'video' ? (
                                        <video
                                            className="w-full h-full object-cover"
                                            src={media.src}
                                            muted
                                            loop
                                            playsInline
                                            onMouseEnter={e => e.target.play()}
                                            onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }}
                                        />
                                    ) : img ? (
                                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={img} alt={title} loading="lazy" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 dark:from-stone-800 dark:via-stone-750 dark:to-stone-900">
                                            <span className="material-symbols-outlined text-4xl text-stone-400 dark:text-stone-600 mb-2">code</span>
                                            <span className="text-[10px] font-bold text-stone-500 dark:text-stone-500 uppercase tracking-widest">{title}</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-primary px-3 py-1 text-[10px] text-white font-bold uppercase tracking-tighter">{tag}</span>
                                    </div>
                                    {media?.type === 'video' && (
                                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                                            <span className="material-symbols-outlined text-white text-sm">play_arrow</span>
                                            <span className="text-white text-[10px] font-bold uppercase tracking-wide">Demo</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-xl font-black mb-3 dark:text-stone-100">{title}</h3>
                                    <p className="text-on-surface-variant dark:text-stone-400 text-sm mb-6 flex-grow leading-relaxed">{desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
                
                <div className="flex justify-center">
                    <Link to="/projects" className="px-8 py-4 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all flex items-center gap-3">
                        View All Projects
                        <span className="material-symbols-outlined">grid_view</span>
                    </Link>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Projects;
