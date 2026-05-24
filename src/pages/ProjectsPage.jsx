import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';
import ConnectWithMe from '../components/ConnectWithMe';
import HoverScrollImage from '../components/HoverScrollImage';
import projects from '../data/projectsData';
import SEO from '../components/SEO';

/* ─── Tag Pill ─── */
const Tag = ({ children }) => (
    <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">
        {children}
    </span>
);

/* ─── Filter Tabs ─── */
const FILTERS = ['All', 'Full-Stack', 'Frontend', 'E-Commerce', 'AI/ML'];

/* ─── Placeholder for projects without images ─── */
const PlaceholderThumb = ({ title }) => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 dark:from-neutral-800 dark:via-neutral-850 dark:to-neutral-900">
        <span className="material-symbols-outlined text-5xl text-neutral-400 dark:text-neutral-600 mb-3">code</span>
        <span className="text-xs font-bold text-neutral-500 dark:text-neutral-500 uppercase tracking-widest">{title}</span>
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
            className="group bg-white dark:bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white shadow-sm hover:shadow-xl dark:shadow-black/20 dark:hover:shadow-black/40 transition-all duration-500 flex flex-col"
        >
            {/* Media */}
            <div className="relative overflow-hidden aspect-video bg-neutral-100 dark:bg-neutral-900">
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
                    <HoverScrollImage src={project.img} alt={project.title} className="w-full h-full" />
                ) : (
                    <PlaceholderThumb title={project.title} />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Tag badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-black/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
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

                <h3 className="text-xl font-black tracking-tight mb-3 text-black dark:text-white uppercase leading-tight">
                    {project.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed flex-1">
                    {project.desc}
                </p>
            </div>
        </motion.div>
    );
};

/* ─── Projects Page ─── */
const ProjectsPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const cafeAiProject = projects.find(p => p.slug === 'cafe-ai');

    const filtered = (activeFilter === 'All'
        ? projects
        : projects.filter(p => p.tag === activeFilter)
    ).filter(p => p.slug !== 'cafe-ai');

    return (
        <PageTransition>
            <SEO 
                title="Projects - Lloyd C. Rosales" 
                description="Explore my portfolio of modern web applications, full-stack systems, and cross-platform mobile apps." 
                path="/projects" 
            />
            <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
                <main className="pt-32 pb-24">
                    {/* Hero */}
                    <header className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-2xl">
                                <span className="inline-block py-1 px-3 mb-4 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black text-xs font-bold uppercase tracking-widest">Selected Works</span>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
                                    CREATIVE <br />
                                    <span className="text-neutral-400 dark:text-neutral-500 italic">SOLUTIONS.</span>
                                </h1>
                                <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                                    A curated collection of real-world projects — from e‑commerce platforms serving thousands of customers, to AI‑powered prototypes and full‑stack applications.
                                </p>
                            </div>
                            <div className="hidden lg:flex gap-4 items-center text-black dark:text-white font-bold text-sm pb-4">
                                <span className="material-symbols-outlined">expand_more</span>
                                <span className="uppercase tracking-widest">Scroll to explore</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured CS Thesis Section (Cafe AI) */}
                    {cafeAiProject && (
                        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24">
                            <div className="relative bg-neutral-50 dark:bg-neutral-950 rounded-3xl p-6 md:p-8 lg:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden group">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-neutral-200/20 dark:bg-neutral-800/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-60 h-60 bg-neutral-200/10 dark:bg-neutral-800/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
                                
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                    {/* Left Column: Cafe AI Video */}
                                    <div className="lg:col-span-7">
                                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-neutral-200 dark:border-neutral-800 shadow-2xl">
                                            {cafeAiProject.media?.type === 'youtube' ? (
                                                <iframe
                                                    className="w-full h-full border-0"
                                                    src={`https://www.youtube.com/embed/${cafeAiProject.media.src}?autoplay=1&mute=1&loop=1&playlist=${cafeAiProject.media.src}&controls=1&rel=0&modestbranding=1`}
                                                    title="Café AI Demo"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <video
                                                    className="w-full h-full object-cover"
                                                    src={cafeAiProject.media?.src}
                                                    controls
                                                    playsInline
                                                    autoPlay
                                                    muted
                                                    loop
                                                />
                                            )}
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-3.5 py-1.5 bg-black/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10 flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                    Featured Demo
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Description */}
                                    <div className="lg:col-span-5 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-wider rounded-full">
                                                CS Thesis
                                            </span>
                                            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-[10px] font-bold uppercase tracking-wider rounded-full border border-neutral-200 dark:border-neutral-800">
                                                AI/ML
                                            </span>
                                        </div>

                                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-black dark:text-white uppercase leading-none">
                                            Café AI
                                        </h2>

                                        <p className="text-base text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed font-medium">
                                            {cafeAiProject.desc}
                                        </p>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-1.5 mb-8">
                                            {cafeAiProject.tags.map(t => (
                                                <span key={t} className="px-3 py-1 bg-neutral-105 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 rounded-full text-[10px] font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black dark:text-white">
                                            <span>First AI Project I've Made</span>
                                            <span className="material-symbols-outlined text-base">smart_toy</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Filter bar */}
                    <section className="max-w-7xl mx-auto px-6 md:px-8 mb-12">
                        <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-xl max-w-fit border border-neutral-200 dark:border-neutral-800 shadow-sm">
                            {FILTERS.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`relative px-5 py-2.5 min-h-[44px] min-w-[44px] text-sm font-bold rounded-lg transition-colors z-10 ${
                                        activeFilter === filter
                                            ? 'text-white dark:text-black'
                                            : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    {activeFilter === filter && (
                                        <motion.span
                                            layoutId="projects-filter-pill"
                                            className="absolute inset-0 bg-black dark:bg-white rounded-lg -z-10"
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
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filtered.map((project, i) => (
                                    <ProjectCard key={project.slug} project={project} index={i} />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filtered.length === 0 && (
                            <div className="text-center py-20">
                                <span className="material-symbols-outlined text-5xl text-neutral-300 dark:text-neutral-600 mb-4 block">search_off</span>
                                <p className="text-neutral-500 dark:text-neutral-400 font-medium">No projects found for this category.</p>
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
