import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    
    const filters = ['All', 'FinTech', 'E-Commerce', 'AI/ML'];

    const cards = [
        {
            id: 1,
            tag: 'FinTech',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNnB6klLFmvp4r78HJk00wlzQLQHJXrbXGrymRosfD-1Jg2JvsnT1xHnM5jTfikoebip1x03Jmv6mYOqD8RlxXiLbnOZK4rcgzx8jZslmcVc0BqCIO08UF-UvAz9puJsfEi4lmQYWBwUfYA8Wb_GrJhBJ-Uv_pKjAjp-4ho0d521_NwVmfN5l4Z9Y6O4G053DmdOm3ODkDNlttFt4Zximee7QnMMSL_UMKhofHKNWBcP7VWek8MQxHmfD0Ma66VtLUSWOrQkuInAIk',
            title: 'Nebula Dashboard',
            desc: 'A real-time financial tracking system for boutique investment firms, focusing on data density and visual clarity.',
        },
        {
            id: 2,
            tag: 'E-Commerce',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKJcMwJn-GbDF3QWLyvwYNnRNkJSf3xZinecnvyOKGn9tnhTYeKcad0kGlRfCs9yJPzEoLYcEqVmm9ym2RDjEnXIlXPi5aiy3xXeMI_eY7prnL_rRKnWugc5d7aiD4vIFqL5gQRLwomWz_9qMg_ca80U8a2Yb1gTLg2ppOoRWARBowx7on-5F1jss6j_r-qP23-dhreQU7_XjqAfoR7m2fSfW6x0BfpiLjbDflF8IXNqNEwjNeJgYzmhIac3zhwLnJdiCuvChGSATr',
            title: 'Atelier Store',
            desc: 'Redefining online shopping with an editorial-first approach, seamless animations, and headless commerce integration.',
        },
        {
            id: 3,
            tag: 'AI/ML',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_1YD4-OQK3riv-7gb7YiI0xUPaNZWQKvcbDHyJpsWt5LflhEnUvrvDTguORMFCm49oZD8zh-DQ-mHkg3mNlFhQhs91Yhap15zgsGZOvy2qbbkhawS3hQwiPzyjZSLCwz4Bfrd_c1CHhKNvu-W3dYyCtlNGmRWj6Ci0RmPfExsNoL7QioIg_qd5vDW1gLXhS3U-9f8PSPPKQbkVXomN6OvcGkQtEx4nTBDaYCh9ZW_W4kte9XierJtoSSqYQ3B4eLQFj71BZsBqXMh',
            title: 'Lumina AI',
            desc: 'An advanced analytics platform leveraging machine learning to predict user behavior in high-traffic editorial environments.',
        },
    ];

    const filteredCards = activeFilter === 'All' 
        ? cards 
        : cards.filter(card => card.tag === activeFilter);

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
                        {filteredCards.map(({ id, tag, img, title, desc }) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={id} 
                                className="group bg-surface-container-lowest dark:bg-stone-800 rounded-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-white/5"
                            >
                                <div className="h-64 overflow-hidden relative">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={img} alt={title} />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-primary px-3 py-1 text-[10px] text-white font-bold uppercase tracking-tighter">{tag}</span>
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-xl font-black mb-3 dark:text-stone-100">{title}</h3>
                                    <p className="text-on-surface-variant dark:text-stone-400 text-sm mb-6 flex-grow leading-relaxed">{desc}</p>
                                    <button className="w-full py-3 bg-surface-container-high dark:bg-stone-700 text-on-surface dark:text-stone-200 font-bold text-sm rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                                        View Details
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
                
                <div className="flex justify-center">
                    <button className="px-8 py-4 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all flex items-center gap-3">
                        View More Projects
                        <span className="material-symbols-outlined">grid_view</span>
                    </button>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Projects;
