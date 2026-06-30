import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import { useEffect } from 'react';
import SEO from '../components/SEO';

const SkillsPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const customStyles = `
        .terminal-cursor::after { content: '_'; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .logo-glow { filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2)); }
        .dark .logo-glow { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2)); }
    `;

    return (
        <PageTransition>
            <SEO 
                title="Skills & Expertise - Lloyd C. Rosales" 
                description="Technical arsenal spanning front-end, back-end, mobile development, and cloud architecture." 
                path="/skills" 
            />
            <style>{customStyles}</style>
            <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
                <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <ScrollReveal className="mb-16">
                    <div className="flex items-end gap-4 mb-2">
                        <span className="text-black dark:text-white text-xs font-mono font-bold tracking-[0.3em]">// CORE_COMPETENCIES</span>
                        <div className="h-[1px] flex-grow bg-neutral-300 dark:bg-neutral-700 mb-1.5"></div>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-headline font-black tracking-tighter text-black dark:text-white uppercase mb-4 leading-[0.9] flex flex-col sm:block">
                        <span>Technical_</span>
                        <span className="text-neutral-400 dark:text-neutral-500">Arsenal</span>
                    </h1>
                    <p className="max-w-2xl text-neutral-500 dark:text-neutral-400 font-body leading-relaxed text-lg border-l-2 border-black dark:border-white pl-6 py-2">
                        The tools I build with day to day — across full-stack web, mobile, AI/ML integration, and cloud deployment. Grouped by where I've actually shipped with them.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <ScrollReveal className="md:col-span-8 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 rounded-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-8xl text-black dark:text-white">deployed_code</span>
                        </div>
                        <h3 className="font-headline text-2xl font-bold tracking-tight text-black dark:text-white mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 bg-black dark:bg-white animate-pulse"></span>
                            Development_Stack
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                            {[
                                { icon: 'fa-brands fa-react', name: 'React', label: 'Daily driver' },
                                { icon: null, letter: 'N', name: 'Next.js', label: 'Working knowledge' },
                                { icon: 'fa-brands fa-node-js', name: 'Node.js', label: 'Production' },
                                { icon: null, letter: 'EX', name: 'Express.js', label: 'Production' },
                                { icon: 'fa-brands fa-laravel', name: 'Laravel', label: 'Production' },
                                { icon: null, letter: '.NET', name: '.NET Framework', label: 'Working knowledge' },
                            ].map(s => (
                                <div key={s.name} className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-700 logo-glow">
                                        {s.icon ? <i className={`${s.icon} text-2xl text-black dark:text-white`}></i> : <div className="text-xl font-black text-black dark:text-white">{s.letter}</div>}
                                    </div>
                                    <div className="space-y-1">
                                        <span className="font-headline font-bold text-black dark:text-white block">{s.name}</span>
                                        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase">{s.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="md:col-span-4 bg-neutral-100 dark:bg-neutral-900 p-8 rounded-lg border-l-4 border-black dark:border-white border-t border-t-neutral-200 dark:border-t-neutral-800 border-r border-r-neutral-200 dark:border-r-neutral-800 border-b border-b-neutral-200 dark:border-b-neutral-800">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-black dark:text-white mb-6 uppercase flex items-center gap-2">
                            <span className="material-symbols-outlined text-black dark:text-white">terminal</span>
                            Deployment_Ops
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { icon: 'fa-solid fa-caret-up', name: 'Vercel' },
                                { icon: 'fa-solid fa-infinity', name: 'CI/CD Pipelines' },
                                { icon: 'fa-brands fa-git-alt', name: 'Git Control' },
                            ].map(d => (
                                <li key={d.name} className="flex items-center gap-3 p-3 bg-white dark:bg-black rounded-sm group hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-colors">
                                    <div className="w-6 h-6 flex items-center justify-center logo-glow"><i className={`${d.icon} text-black dark:text-white text-sm`}></i></div>
                                    <span className="font-headline font-medium text-black dark:text-white">{d.name}</span>
                                    <span className="ml-auto material-symbols-outlined text-[10px] text-black dark:text-white animate-pulse" style={{fontVariationSettings: "'FILL' 1"}}>circle</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 p-4 bg-white dark:bg-black/40 border border-neutral-200 dark:border-neutral-800 rounded font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
                            <p className="mb-1 text-black dark:text-white terminal-cursor">{'> git push origin main'}</p>
                            <p>{'> CI: lint + build'}</p>
                            <p>{'> deploy: Vercel / Render'}</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="md:col-span-12 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 rounded-lg border-b-4 border-b-black/30 dark:border-b-white/20">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <h3 className="font-headline text-2xl md:text-3xl font-black tracking-tighter text-black dark:text-white uppercase flex items-center gap-4">
                                <span className="material-symbols-outlined text-black dark:text-white text-4xl">psychology</span>
                                AI_Engineer_Module
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-white dark:bg-neutral-900 text-[10px] font-bold text-black dark:text-white tracking-widest uppercase rounded">Machine_Learning</span>
                                <span className="px-3 py-1 bg-white dark:bg-neutral-900 text-[10px] font-bold text-neutral-500 tracking-widest uppercase rounded">LLM_Integration</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                            {[
                                { icon: 'fa-solid fa-robot', cat: 'LLM APIs', name: 'OpenAI / Gemini' },
                                { icon: 'fa-solid fa-link', cat: 'Framework', name: 'LangChain' },
                                { icon: 'fa-solid fa-server', cat: 'Local LLM', name: 'Ollama' },
                                { icon: 'fa-solid fa-diagram-project', cat: 'Automation', name: 'n8n Workflows' },
                                { icon: 'fa-solid fa-brain', cat: 'ML Foundation', name: 'Scikit-learn' },
                                { icon: 'fa-brands fa-python', cat: 'Data', name: 'NumPy / Pandas' },
                            ].map(a => (
                                <div key={a.name} className="px-4 lg:px-6 py-4 bg-white dark:bg-neutral-900 rounded-sm flex flex-col gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-default border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700">
                                    <div className="flex items-center gap-2">
                                        <i className={`${a.icon} text-black dark:text-white text-sm logo-glow`}></i>
                                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono uppercase">{a.cat}</span>
                                    </div>
                                    <span className="font-headline font-bold text-sm lg:text-base text-black dark:text-white">{a.name}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="md:col-span-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 rounded-lg group">
                        <h3 className="font-headline text-xl flex items-center gap-2 font-bold tracking-tight text-black dark:text-white mb-8 uppercase">
                            <span className="material-symbols-outlined text-black dark:text-white">cloud</span> Cloud_Nexus
                        </h3>
                        <div className="space-y-6">
                            {[
                                { icon: 'fa-brands fa-aws', name: 'AWS / Azure', desc: 'EC2, S3, App Service, Functions, Storage.' },
                                { icon: 'fa-solid fa-fire', name: 'Firebase / Supabase', desc: 'Auth, Storage, Edge Functions, Real-time syncing.' },
                            ].map(c => (
                                <div key={c.name} className="flex items-start gap-4">
                                    <div className="p-2 bg-white dark:bg-neutral-900 text-black dark:text-white rounded border border-neutral-200 dark:border-neutral-700 logo-glow flex items-center justify-center w-12 h-12">
                                        <i className={`${c.icon} text-2xl`}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-headline font-bold text-black dark:text-white mb-1">{c.name}</h4>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-body">{c.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="md:col-span-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 rounded-lg">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-black dark:text-white mb-8 uppercase flex items-center gap-2">
                             <span className="material-symbols-outlined text-black dark:text-white">dataset</span> Data_Infrastructure
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[{ label: 'Relational', name: 'MySQL' }, { label: 'Structured', name: 'PostgreSQL' }].map(db => (
                                <div key={db.name} className="aspect-square bg-white dark:bg-neutral-900 flex flex-col items-center justify-center p-4 rounded-sm border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all cursor-crosshair group/db">
                                    <div className="w-12 h-12 mb-3 bg-neutral-50 dark:bg-black flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 logo-glow group-hover/db:border-black dark:group-hover/db:border-white transition-colors">
                                        <i className="fa-solid fa-database text-2xl text-black dark:text-white"></i>
                                    </div>
                                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono mb-2 uppercase tracking-widest">{db.label}</span>
                                    <span className="font-headline font-black text-xl lg:text-2xl uppercase text-black dark:text-white">{db.name}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="md:col-span-7 bg-neutral-100 dark:bg-neutral-900 p-8 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-black dark:text-white mb-6 uppercase flex items-center gap-2">
                            <span className="w-1 h-4 bg-black dark:bg-white"></span>
                            Core_Logic & Soft_Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['Problem-solving','Analytical Thinking','Algorithmic Design','System Architecture','Communication','Collaboration','Adaptability'].map(s => (
                                <span key={s} className="px-3 py-2 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:text-black dark:hover:text-white transition-colors rounded">{s}</span>
                            ))}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="md:col-span-5 bg-neutral-50 dark:bg-neutral-950 p-8 rounded-lg relative overflow-hidden border border-neutral-200 dark:border-neutral-800">
                        <div className="absolute -bottom-4 -right-4 opacity-5 dark:opacity-10">
                            <span className="material-symbols-outlined text-[120px] text-black dark:text-white">settings_suggest</span>
                        </div>
                        <h3 className="font-headline text-xl font-bold tracking-tight text-black dark:text-white mb-6 uppercase z-10 relative">Other_Technical</h3>
                        <div className="space-y-4 z-10 relative">
                            {['Excel Data Management','Hardware & Software Diagnostics'].map(t => (
                                <div key={t} className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-black dark:text-white">check_circle</span>
                                    <span className="text-neutral-700 dark:text-neutral-300 text-sm font-bold">{t}</span>
                                </div>
                            ))}
                            <div className="inline-block mt-4 px-4 py-1.5 bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 text-black dark:text-white text-xs font-black tracking-widest uppercase rounded">
                                NCII CERTIFIED COMPUTER SYSTEMS SERVICING
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

            </main>
            <Footer />
            </div>
        </PageTransition>
    );
};

export default SkillsPage;
