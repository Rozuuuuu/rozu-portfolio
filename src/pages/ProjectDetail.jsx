import { useParams, Link, useNavigate } from 'react-router-dom';
import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import ConnectWithMe from '../components/ConnectWithMe';
import ProjectLinks from '../components/ProjectLinks';
import projects from '../data/projectsData';

const Tag = ({ children }) => (
    <span className="px-4 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-[10px] font-bold text-black dark:text-white uppercase tracking-wider">
        {children}
    </span>
);

const StarrSection = ({ icon, label, title, children, index }) => (
    <ScrollReveal delay={index * 0.05}>
        <div id={label.toLowerCase()} className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-black dark:text-white text-xl">{icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black dark:text-white font-mono">{label}</span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight mb-4 text-black dark:text-white">{title}</h3>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{children}</p>
        </div>
    </ScrollReveal>
);

const starrNav = [
    { id: 'situation', icon: 'explore', label: 'Situation' },
    { id: 'task', icon: 'assignment', label: 'Task' },
    { id: 'action', icon: 'build', label: 'Action' },
    { id: 'result', icon: 'insights', label: 'Result' },
    { id: 'reflection', icon: 'psychology', label: 'Reflection' },
];

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return (
            <PageTransition>
                <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
                    <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-8 text-center">
                        <span className="material-symbols-outlined text-7xl text-neutral-300 dark:text-neutral-600 mb-6 block">search_off</span>
                        <h1 className="text-4xl font-black tracking-tighter mb-4">Project Not Found</h1>
                        <p className="text-neutral-500 mb-8">The project doesn't exist or has been moved.</p>
                        <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg uppercase tracking-widest text-sm">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>Back to Projects
                        </Link>
                    </main>
                    <SharedFooter />
                </div>
            </PageTransition>
        );
    }

    const hasStarr = project.situation && project.task && project.action && project.result && project.reflection;
    const hasVideo = project.media?.type === 'video';
    const hasYouTube = project.media?.type === 'youtube';
    const hasImage = !!project.img;

    return (
        <PageTransition>
            <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
                <main className="pt-32 pb-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
                        <button onClick={() => navigate('/projects')} className="inline-flex items-center gap-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>All Projects
                        </button>
                    </div>

                    <header className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
                        <ScrollReveal>
                            <div className="relative overflow-hidden rounded-xl aspect-[21/9] mb-10 shadow-xl dark:shadow-black/40 bg-neutral-200 dark:bg-neutral-800">
                                {hasVideo ? (
                                    <video className="w-full h-full object-cover" src={project.media.src} controls playsInline poster={project.img || undefined} />
                                ) : hasYouTube ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube-nocookie.com/embed/${project.media.src}`}
                                        title={`${project.title} video`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                ) : hasImage ? (
                                    /* [PERF FIX 4] Image lazy loading and dimensions */
                                    <img className="w-full h-full object-cover" src={project.img} alt={project.title} width="800" height="450" loading="lazy" decoding="async" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                                        <span className="material-symbols-outlined text-7xl text-neutral-400 mb-4">code</span>
                                        <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">{project.title}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 pointer-events-none">
                                    <div className="flex flex-wrap gap-2 mb-4">{project.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
                                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase">{project.title}</h1>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1}>
                            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">{project.desc}</p>
                            <ProjectLinks live={project.live} repo={project.repo} className="mt-6" />
                        </ScrollReveal>
                    </header>

                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        {hasStarr ? (
                            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                                <aside className="hidden lg:block w-56 flex-shrink-0">
                                    <div className="sticky top-32">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 mb-4 block font-mono">STARR Framework</span>
                                        <nav className="space-y-1">
                                            {starrNav.map(({ id, icon, label }) => (
                                                <a key={id} href={`#${id}`} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                                                    <span className="material-symbols-outlined text-base">{icon}</span>{label}
                                                </a>
                                            ))}
                                        </nav>
                                    </div>
                                </aside>
                                <div className="flex-1 space-y-16">
                                    <StarrSection icon="explore" label="Situation" title="Context & Problem" index={0}>{project.situation}</StarrSection>
                                    <StarrSection icon="assignment" label="Task" title="Engineering Objectives" index={1}>{project.task}</StarrSection>
                                    <StarrSection icon="build" label="Action" title="Technical Approach" index={2}>{project.action}</StarrSection>
                                    <StarrSection icon="insights" label="Result" title="Quantified Outcomes" index={3}>{project.result}</StarrSection>
                                    <StarrSection icon="psychology" label="Reflection" title="Lessons & Growth" index={4}>{project.reflection}</StarrSection>
                                </div>
                            </div>
                        ) : (
                            <ScrollReveal>
                                <div className="max-w-3xl">
                                    <div className="flex items-center gap-3 mb-6 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                                        <span className="material-symbols-outlined text-black dark:text-white">info</span>
                                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Detailed case study coming soon.</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-8">{project.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
                                    <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">{project.desc}</p>
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                    <ConnectWithMe />
                </main>
                <SharedFooter />
            </div>
        </PageTransition>
    );
};

export default ProjectDetail;
