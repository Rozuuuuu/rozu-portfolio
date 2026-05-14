import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SharedNav from '../components/SharedNav';
import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import ConnectWithMe from '../components/ConnectWithMe';
import projects from '../data/projectsData';

/* ─── STARR Section Block ─── */
const StarrSection = ({ icon, label, title, children, index }) => (
    <ScrollReveal delay={index * 0.05}>
        <div id={label.toLowerCase()} className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary dark:text-red-400 text-xl">
                    {icon}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary dark:text-red-400 font-mono">
                    {label}
                </span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight mb-4 text-stone-900 dark:text-stone-50">
                {title}
            </h3>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                {children}
            </p>
        </div>
    </ScrollReveal>
);

/* ─── Tag Pill ─── */
const Tag = ({ children }) => (
    <span className="px-4 py-1 bg-red-50 dark:bg-stone-700 border border-red-200 dark:border-stone-600 rounded-full text-[10px] font-bold text-primary dark:text-red-400 uppercase tracking-wider">
        {children}
    </span>
);

/* ─── STARR sidebar nav items ─── */
const starrNav = [
    { id: 'situation', icon: 'explore', label: 'Situation' },
    { id: 'task', icon: 'assignment', label: 'Task' },
    { id: 'action', icon: 'build', label: 'Action' },
    { id: 'result', icon: 'insights', label: 'Result' },
    { id: 'reflection', icon: 'psychology', label: 'Reflection' },
];

/* ─── Project Detail Page ─── */
const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return (
            <PageTransition>
                <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-300">
                    <SharedNav />
                    <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-8 text-center">
                        <span className="material-symbols-outlined text-7xl text-stone-300 dark:text-stone-600 mb-6 block">
                            search_off
                        </span>
                        <h1 className="text-4xl font-black tracking-tighter mb-4 dark:text-stone-50">
                            Project Not Found
                        </h1>
                        <p className="text-stone-500 dark:text-stone-400 mb-8">
                            The project you're looking for doesn't exist or has been moved.
                        </p>
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg uppercase tracking-widest text-sm hover:bg-primary-container transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Projects
                        </Link>
                    </main>
                    <SharedFooter />
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-300">
                <SharedNav />

                <main className="pt-32 pb-24">
                    {/* ── Back link ── */}
                    <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
                        <button
                            onClick={() => navigate('/projects')}
                            className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-primary dark:hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            All Projects
                        </button>
                    </div>

                    {/* ── Hero ── */}
                    <header className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
                        <ScrollReveal>
                            <div className="relative overflow-hidden rounded-xl aspect-[21/9] mb-10 shadow-xl dark:shadow-black/40">
                                <img
                                    className="w-full h-full object-cover"
                                    src={project.img}
                                    alt={project.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map(t => <Tag key={t}>{t}</Tag>)}
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase">
                                        {project.title}
                                    </h1>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
                                {project.desc}
                            </p>
                        </ScrollReveal>
                    </header>

                    {/* ── Content: Sidebar + STARR ── */}
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                            {/* Sticky sidebar nav (desktop) */}
                            <aside className="hidden lg:block w-56 flex-shrink-0">
                                <div className="sticky top-32">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 mb-4 block font-mono">
                                        STARR Framework
                                    </span>
                                    <nav className="space-y-1">
                                        {starrNav.map(({ id, icon, label }) => (
                                            <a
                                                key={id}
                                                href={`#${id}`}
                                                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-primary dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-stone-800 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-base">{icon}</span>
                                                {label}
                                            </a>
                                        ))}
                                    </nav>

                                    {/* Quick links */}
                                    {project.links && (
                                        <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800 space-y-3">
                                            {project.links.demo && (
                                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm font-bold text-primary dark:text-red-400 hover:gap-3 transition-all">
                                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                    Live Demo
                                                </a>
                                            )}
                                            {project.links.github && (
                                                <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-primary dark:hover:text-red-400 hover:gap-3 transition-all">
                                                    <span className="material-symbols-outlined text-sm">code</span>
                                                    GitHub
                                                </a>
                                            )}
                                            {project.links.docs && (
                                                <a href={project.links.docs} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-primary dark:hover:text-red-400 hover:gap-3 transition-all">
                                                    <span className="material-symbols-outlined text-sm">description</span>
                                                    Documentation
                                                </a>
                                            )}
                                            {project.links.live && (
                                                <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-primary dark:hover:text-red-400 hover:gap-3 transition-all">
                                                    <span className="material-symbols-outlined text-sm">language</span>
                                                    Live Site
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </aside>

                            {/* STARR Content */}
                            <div className="flex-1 space-y-16">
                                <StarrSection icon="explore" label="Situation" title="Context & Problem" index={0}>
                                    {project.situation}
                                </StarrSection>

                                <StarrSection icon="assignment" label="Task" title="Engineering Objectives" index={1}>
                                    {project.task}
                                </StarrSection>

                                <StarrSection icon="build" label="Action" title="Technical Approach" index={2}>
                                    {project.action}
                                </StarrSection>

                                <StarrSection icon="insights" label="Result" title="Quantified Outcomes" index={3}>
                                    {project.result}
                                </StarrSection>

                                <StarrSection icon="psychology" label="Reflection" title="Lessons & Growth" index={4}>
                                    {project.reflection}
                                </StarrSection>

                                {/* Mobile links */}
                                <div className="lg:hidden flex flex-wrap gap-4 pt-8 border-t border-stone-200 dark:border-stone-800">
                                    {project.links.demo && (
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg text-sm uppercase tracking-widest hover:bg-primary-container transition-colors">
                                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                                            Live Demo
                                        </a>
                                    )}
                                    {project.links.github && (
                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-bold rounded-lg text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-sm">code</span>
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Connect With Me CTA ── */}
                    <ConnectWithMe />
                </main>

                <SharedFooter />
            </div>
        </PageTransition>
    );
};

export default ProjectDetail;
