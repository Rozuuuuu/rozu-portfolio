import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SharedNav from '../components/SharedNav';
import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';
import ConnectWithMe from '../components/ConnectWithMe';
import projects from '../data/projectsData';

/* ─── Tag Pill ─── */
const Tag = ({ children }) => (
    <span className="px-3 py-1 bg-red-50 dark:bg-stone-700 border border-red-200 dark:border-stone-600 rounded-full text-[10px] font-bold text-primary dark:text-red-400 uppercase tracking-wider">
        {children}
    </span>
);

/* ─── Filter Tabs ─── */
const FILTERS = ['All', 'Full-Stack', 'Frontend', 'E-Commerce', 'AI/ML'];

/* ─── Placeholder for projects without images ─── */
const PlaceholderThumb = ({ title }) => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 dark:from-stone-800 dark:via-stone-750 dark:to-stone-900">
        <span className="material-symbols-outlined text-5xl text-stone-400 dark:text-stone-600 mb-3">code</span>
        <span className="text-xs font-bold text-stone-500 dark:text-stone-500 uppercase tracking-widest">{title}</span>
    </div>
);

/* ─── Project Card ─── */
const ProjectCard = ({ project, index }) => {
    const hasVideo = project.media?.type === 'video';
    const hasImage = !!project.img;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group bg-white dark:bg-stone-800/60 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-700/50 hover:border-primary/30 dark:hover:border-red-400/30 shadow-sm hover:shadow-xl dark:shadow-black/20 dark:hover:shadow-black/40 transition-all duration-500 flex flex-col"
        >
            {/* Media */}
            <div className="relative overflow-hidden aspect-video bg-stone-100 dark:bg-stone-800">
                {hasVideo ? (
                    <video
                        className="w-full h-full object-cover"
                        src={project.media.src}
                        muted
                        loop
                        playsInline
                        onMouseEnter={e => e.target.play()}
                        onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }}
                        poster={project.img || undefined}
                    />
                ) : hasImage ? (
                    <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={project.img}
                        alt={project.title}
                        loading="lazy"
                    />
                ) : (
                    <PlaceholderThumb title={project.title} />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Tag badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-primary/90 dark:bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {project.tag}
                    </span>
                </div>

                {/* Video indicator */}
                {hasVideo && (
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-white text-sm">play_arrow</span>
                        <span className="text-white text-[10px] font-bold uppercase tracking-wide">Demo</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>

                <h3 className="text-xl font-black tracking-tight mb-3 text-stone-900 dark:text-stone-50 uppercase leading-tight">
                    {project.title}
                </h3>

                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed flex-1">
                    {project.desc}
                </p>
            </div>
        </motion.div>
    );
};

/* ─── Projects Page ─── */
const ProjectsPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.tag === activeFilter);

    return (
        <PageTransition>
            <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-300">
                <SharedNav />

                <main className="pt-32 pb-24">
                    {/* Hero */}
                    <header className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-2xl">
                                <span className="inline-block py-1 px-3 mb-4 rounded-full bg-blue-900/80 text-blue-100 dark:bg-blue-800 dark:text-blue-100 text-xs font-bold uppercase tracking-widest">Selected Works</span>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
                                    CREATIVE <br />
                                    <span className="text-primary dark:text-red-400 italic">SOLUTIONS.</span>
                                </h1>
                                <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
                                    A curated collection of real-world projects — from e‑commerce platforms serving thousands of customers, to AI‑powered prototypes and full‑stack applications.
                                </p>
                            </div>
                            <div className="hidden lg:flex gap-4 items-center text-primary dark:text-red-400 font-bold text-sm pb-4">
                                <span className="material-symbols-outlined">expand_more</span>
                                <span className="uppercase tracking-widest">Scroll to explore</span>
                            </div>
                        </div>
                    </header>

                    {/* Filter bar */}
                    <section className="max-w-7xl mx-auto px-6 md:px-8 mb-12">
                        <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100 dark:bg-stone-800/80 rounded-xl max-w-fit border border-stone-200 dark:border-white/5 shadow-sm">
                            {FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`relative px-5 py-2.5 text-sm font-bold rounded-lg transition-colors z-10 ${
                                        activeFilter === filter
                                            ? 'text-white dark:text-stone-900'
                                            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                                    }`}
                                >
                                    {activeFilter === filter && (
                                        <motion.span
                                            layoutId="projects-filter-pill"
                                            className="absolute inset-0 bg-primary dark:bg-stone-200 rounded-lg -z-10"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Grid */}
                    <section className="max-w-7xl mx-auto px-6 md:px-8">
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filtered.map((project, i) => (
                                    <ProjectCard key={project.slug} project={project} index={i} />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filtered.length === 0 && (
                            <div className="text-center py-20">
                                <span className="material-symbols-outlined text-5xl text-stone-300 dark:text-stone-600 mb-4 block">search_off</span>
                                <p className="text-stone-500 dark:text-stone-400 font-medium">No projects found for this category.</p>
                            </div>
                        )}
                    </section>

                    {/* Connect With Me CTA */}
                    <ConnectWithMe />
                </main>

                <SharedFooter />
            </div>
        </PageTransition>
    );
};

export default ProjectsPage;
