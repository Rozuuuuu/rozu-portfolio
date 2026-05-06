import PageTransition from '../components/PageTransition';
import SharedNav from '../components/SharedNav';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import { useEffect } from 'react';

const SkillsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const customStyles = `
        .terminal-cursor::after {
            content: '_';
            animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
        .logo-glow {
            filter: drop-shadow(0 0 5px rgba(188, 0, 10, 0.4));
        }
        .dark .logo-glow {
            filter: drop-shadow(0 0 5px rgba(255, 180, 171, 0.4));
        }
    `;

    return (
        <PageTransition>
            <style>{customStyles}</style>
            <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-300">
                <SharedNav />
                <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <ScrollReveal className="mb-16">
                    <div className="flex items-end gap-4 mb-2">
                        <span className="text-primary dark:text-[#ffb4ab] text-xs font-mono font-bold tracking-[0.3em]">SYSTEM_VERSION: 4.0.2</span>
                        <div className="h-[1px] flex-grow bg-primary/20 dark:bg-outline-variant/15 mb-1.5"></div>
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-headline font-black tracking-tighter text-on-surface dark:text-stone-100 uppercase mb-4 leading-[0.9] flex flex-col sm:block">
                        <span>Technical_</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-container dark:to-[#ffb4ab]">Arsenal</span>
                    </h1>
                    <p className="max-w-2xl text-on-surface-variant dark:text-stone-400 font-body leading-relaxed text-lg border-l-2 border-primary dark:border-[#ffb4ab] pl-6 py-2">
                        Unified deployment parameters and multi-stack architecture logic. Executing core proficiency modules for high-scale digital environments.
                    </p>
                </ScrollReveal>

                {/* Main Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Development Stack: Main Command Card */}
                    <ScrollReveal className="md:col-span-8 bg-surface-container-low dark:bg-stone-900 border border-primary/10 dark:border-white/5 p-8 rounded-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-8xl text-stone-900 dark:text-white" data-icon="deployed_code">deployed_code</span>
                        </div>
                        <h3 className="font-headline text-2xl font-bold tracking-tight text-primary dark:text-[#ffb4ab] mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 bg-primary dark:bg-[#ffb4ab] animate-pulse"></span>
                            Development_Stack
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                            {/* Skill Items */}
                            <div className="flex items-center gap-4 group/item">
                                <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-stone-800 rounded border border-primary/20 logo-glow">
                                    <i className="fa-brands fa-react text-2xl text-primary dark:text-[#ffb4ab]"></i>
                                </div>
                                <div className="space-y-1">
                                    <span className="font-headline font-bold text-on-surface dark:text-stone-100 block">React</span>
                                    <span className="text-[10px] font-mono text-primary/70 dark:text-[#ffb4ab]/60 uppercase">Framework_Active</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group/item">
                                <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-stone-800 rounded border border-primary/20 logo-glow">
                                    <div className="text-2xl font-black text-primary dark:text-[#ffb4ab]">N</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="font-headline font-bold text-on-surface dark:text-stone-100 block">Next.js</span>
                                    <span className="text-[10px] font-mono text-primary/70 dark:text-[#ffb4ab]/60 uppercase">SSR_Operational</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group/item">
                                <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-stone-800 rounded border border-primary/20 logo-glow">
                                    <i className="fa-brands fa-node-js text-2xl text-primary dark:text-[#ffb4ab]"></i>
                                </div>
                                <div className="space-y-1">
                                    <span className="font-headline font-bold text-on-surface dark:text-stone-100 block">Node.js</span>
                                    <span className="text-[10px] font-mono text-primary/70 dark:text-[#ffb4ab]/60 uppercase">Runtime_Link</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group/item">
                                <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-stone-800 rounded border border-primary/20 logo-glow">
                                    <div className="text-xl font-black text-primary dark:text-[#ffb4ab]">EX</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="font-headline font-bold text-on-surface dark:text-stone-100 block">Express.js</span>
                                    <span className="text-[10px] font-mono text-primary/70 dark:text-[#ffb4ab]/60 uppercase">Server_Logic</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group/item">
                                <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-stone-800 rounded border border-primary/20 logo-glow">
                                    <i className="fa-brands fa-laravel text-2xl text-primary dark:text-[#ffb4ab]"></i>
                                </div>
                                <div className="space-y-1">
                                    <span className="font-headline font-bold text-on-surface dark:text-stone-100 block">Laravel</span>
                                    <span className="text-[10px] font-mono text-primary/70 dark:text-[#ffb4ab]/60 uppercase">Backend_Core</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group/item">
                                <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-stone-800 rounded border border-primary/20 logo-glow">
                                    <div className="text-xl font-bold text-primary dark:text-[#ffb4ab]">.NET</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="font-headline font-bold text-on-surface dark:text-stone-100 block">.NET Framework</span>
                                    <span className="text-[10px] font-mono text-primary/70 dark:text-[#ffb4ab]/60 uppercase">Enterprise_Sync</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Deployment Ops: Sidebar Card */}
                    <ScrollReveal className="md:col-span-4 bg-surface-container-high dark:bg-stone-800 p-8 rounded-lg border-l-4 border-primary dark:border-[#ffb4ab] border-t border-t-primary/10 border-r border-r-primary/10 border-b border-b-primary/10 shadow-[0_0_20px_rgba(188,0,10,0.05)] dark:shadow-[0_0_20px_rgba(255,180,171,0.05)]">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface dark:text-stone-100 mb-6 uppercase flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary dark:text-[#ffb4ab]">terminal</span>
                            Deployment_Ops
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 p-3 bg-white dark:bg-stone-900 rounded-sm group hover:bg-primary/5 dark:hover:bg-[#ffb4ab]/10 transition-colors">
                                <div className="w-6 h-6 flex items-center justify-center logo-glow">
                                    <i className="fa-solid fa-caret-up text-primary dark:text-[#ffb4ab] text-sm"></i>
                                </div>
                                <span className="font-headline font-medium dark:text-stone-200">Vercel</span>
                                <span className="ml-auto material-symbols-outlined text-[10px] text-primary dark:text-[#ffb4ab] animate-pulse" style={{fontVariationSettings: "'FILL' 1"}}>circle</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 bg-white dark:bg-stone-900 rounded-sm group hover:bg-primary/5 dark:hover:bg-[#ffb4ab]/10 transition-colors">
                                <div className="w-6 h-6 flex items-center justify-center logo-glow">
                                    <i className="fa-solid fa-infinity text-primary dark:text-[#ffb4ab] text-xs"></i>
                                </div>
                                <span className="font-headline font-medium dark:text-stone-200">CI/CD Pipelines</span>
                                <span className="ml-auto material-symbols-outlined text-[10px] text-primary dark:text-[#ffb4ab] animate-pulse" style={{fontVariationSettings: "'FILL' 1"}}>circle</span>
                            </li>
                            <li className="flex items-center gap-3 p-3 bg-white dark:bg-stone-900 rounded-sm group hover:bg-primary/5 dark:hover:bg-[#ffb4ab]/10 transition-colors">
                                <div className="w-6 h-6 flex items-center justify-center logo-glow">
                                    <i className="fa-brands fa-git-alt text-primary dark:text-[#ffb4ab] text-sm"></i>
                                </div>
                                <span className="font-headline font-medium dark:text-stone-200">Git Control</span>
                                <span className="ml-auto material-symbols-outlined text-[10px] text-primary dark:text-[#ffb4ab] animate-pulse" style={{fontVariationSettings: "'FILL' 1"}}>circle</span>
                            </li>
                        </ul>
                        <div className="mt-8 p-4 bg-surface dark:bg-black/40 border border-primary/10 dark:border-white/10 rounded font-mono text-[10px] text-on-surface-variant dark:text-stone-400">
                            <p className="mb-1 text-primary dark:text-[#ffb4ab] terminal-cursor">{'> INIT PRODUCTION_SYNC'}</p>
                            <p>{'> STATUS: OPERATIONAL'}</p>
                            <p>{'> LATENCY: 24ms'}</p>
                        </div>
                    </ScrollReveal>

                    {/* AI Engineer Module */}
                    <ScrollReveal className="md:col-span-12 bg-surface-container-low dark:bg-stone-900 border border-primary/10 dark:border-white/5 p-8 rounded-lg border-b-4 border-b-primary/50 dark:border-b-[#ffb4ab]/30">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <h3 className="font-headline text-2xl md:text-3xl font-black tracking-tighter text-on-surface dark:text-stone-100 uppercase flex items-center gap-4">
                                <span className="material-symbols-outlined text-primary dark:text-[#ffb4ab] text-4xl">psychology</span>
                                AI_Engineer_Module
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-white dark:bg-stone-800 text-[10px] font-bold text-primary dark:text-[#ffb4ab] tracking-widest uppercase rounded">Neural_Processing</span>
                                <span className="px-3 py-1 bg-white dark:bg-stone-800 text-[10px] font-bold text-on-surface-variant dark:text-stone-400 tracking-widest uppercase rounded">Active_Link</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                            <div className="px-4 lg:px-6 py-4 bg-white dark:bg-stone-800 rounded-sm flex flex-col gap-2 hover:bg-surface-container dark:hover:bg-stone-700 transition-colors cursor-default border border-transparent hover:border-primary/20 dark:hover:border-[#ffb4ab]/20">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-brain text-primary dark:text-[#ffb4ab] text-sm logo-glow"></i>
                                    <span className="text-[10px] text-primary/80 dark:text-[#ffb4ab]/80 font-mono uppercase">Library</span>
                                </div>
                                <span className="font-headline font-bold text-sm lg:text-base dark:text-stone-100">Scikit-learn</span>
                            </div>
                            <div className="px-4 lg:px-6 py-4 bg-white dark:bg-stone-800 rounded-sm flex flex-col gap-2 hover:bg-surface-container dark:hover:bg-stone-700 transition-colors cursor-default border border-transparent hover:border-primary/20 dark:hover:border-[#ffb4ab]/20">
                                <div className="flex items-center gap-2">
                                    <i className="fa-brands fa-python text-primary dark:text-[#ffb4ab] text-sm logo-glow"></i>
                                    <span className="text-[10px] text-primary/80 dark:text-[#ffb4ab]/80 font-mono uppercase">Math</span>
                                </div>
                                <span className="font-headline font-bold text-sm lg:text-base dark:text-stone-100">Numpy/Pandas</span>
                            </div>
                            <div className="px-4 lg:px-6 py-4 bg-white dark:bg-stone-800 rounded-sm flex flex-col gap-2 hover:bg-surface-container dark:hover:bg-stone-700 transition-colors cursor-default border border-transparent hover:border-primary/20 dark:hover:border-[#ffb4ab]/20">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-filter text-primary dark:text-[#ffb4ab] text-sm logo-glow"></i>
                                    <span className="text-[10px] text-primary/80 dark:text-[#ffb4ab]/80 font-mono uppercase">Logic</span>
                                </div>
                                <span className="font-headline font-bold text-sm lg:text-base dark:text-stone-100">Preprocessing</span>
                            </div>
                            <div className="px-4 lg:px-6 py-4 bg-white dark:bg-stone-800 rounded-sm flex flex-col gap-2 hover:bg-surface-container dark:hover:bg-stone-700 transition-colors cursor-default border border-transparent hover:border-primary/20 dark:hover:border-[#ffb4ab]/20">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-microchip text-primary dark:text-[#ffb4ab] text-sm logo-glow"></i>
                                    <span className="text-[10px] text-primary/80 dark:text-[#ffb4ab]/80 font-mono uppercase">Core</span>
                                </div>
                                <span className="font-headline font-bold text-sm lg:text-base dark:text-stone-100">Model Training</span>
                            </div>
                            <div className="px-4 lg:px-6 py-4 bg-white dark:bg-stone-800 rounded-sm flex flex-col gap-2 hover:bg-surface-container dark:hover:bg-stone-700 transition-colors cursor-default border border-transparent hover:border-primary/20 dark:hover:border-[#ffb4ab]/20">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-database text-primary dark:text-[#ffb4ab] text-sm logo-glow"></i>
                                    <span className="text-[10px] text-primary/80 dark:text-[#ffb4ab]/80 font-mono uppercase">Data</span>
                                </div>
                                <span className="font-headline font-bold text-sm lg:text-base dark:text-stone-100">Feature Engineering</span>
                            </div>
                            <div className="px-4 lg:px-6 py-4 bg-white dark:bg-stone-800 rounded-sm flex flex-col gap-2 hover:bg-surface-container dark:hover:bg-stone-700 transition-colors cursor-default border border-transparent hover:border-primary/20 dark:hover:border-[#ffb4ab]/20">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-chart-line text-primary dark:text-[#ffb4ab] text-sm logo-glow"></i>
                                    <span className="text-[10px] text-primary/80 dark:text-[#ffb4ab]/80 font-mono uppercase">Process</span>
                                </div>
                                <span className="font-headline font-bold text-sm lg:text-base dark:text-stone-100">Optimization</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Cloud Nexus & Data Infra */}
                    <ScrollReveal className="md:col-span-6 bg-surface-container-low dark:bg-stone-900 border border-primary/10 dark:border-white/5 p-8 rounded-lg group">
                        <h3 className="font-headline text-xl flex items-center gap-2 font-bold tracking-tight text-on-surface dark:text-stone-100 mb-8 uppercase">
                            <span className="material-symbols-outlined text-primary dark:text-red-400">cloud</span> Cloud_Nexus
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white dark:bg-stone-800 text-primary dark:text-[#ffb4ab] rounded border border-primary/20 logo-glow flex items-center justify-center w-12 h-12">
                                    <i className="fa-brands fa-aws text-2xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-headline font-bold text-on-surface dark:text-stone-100 mb-1">AWS / Azure</h4>
                                    <p className="text-sm text-on-surface-variant dark:text-stone-400 font-body">EC2, S3, App Service, Functions, Storage.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white dark:bg-stone-800 text-primary dark:text-[#ffb4ab] rounded border border-primary/20 logo-glow flex items-center justify-center w-12 h-12">
                                    <i className="fa-solid fa-fire text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-headline font-bold text-on-surface dark:text-stone-100 mb-1">Firebase / Supabase</h4>
                                    <p className="text-sm text-on-surface-variant dark:text-stone-400 font-body">Auth, Storage, Edge Functions, Real-time syncing.</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="md:col-span-6 bg-surface-container-low dark:bg-stone-900 border border-primary/10 dark:border-white/5 p-8 rounded-lg">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface dark:text-stone-100 mb-8 uppercase flex items-center gap-2">
                             <span className="material-symbols-outlined text-primary dark:text-orange-400">dataset</span> Data_Infrastructure
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square bg-white dark:bg-stone-800 flex flex-col items-center justify-center p-4 rounded-sm border border-primary/10 dark:border-white/10 hover:border-primary dark:hover:border-[#ffb4ab] transition-all cursor-crosshair group/db">
                                <div className="w-12 h-12 mb-3 bg-surface dark:bg-stone-950 flex items-center justify-center rounded-full border border-primary/10 dark:border-[#ffb4ab]/20 logo-glow group-hover/db:border-primary/40 transition-colors">
                                    <i className="fa-solid fa-database text-2xl text-primary dark:text-[#ffb4ab]"></i>
                                </div>
                                <span className="text-[10px] text-primary/70 dark:text-[#ffb4ab]/70 font-mono mb-2 uppercase tracking-widest">Relational</span>
                                <span className="font-headline font-black text-xl lg:text-2xl uppercase dark:text-stone-100">MySQL</span>
                            </div>
                            <div className="aspect-square bg-white dark:bg-stone-800 flex flex-col items-center justify-center p-4 rounded-sm border border-primary/10 dark:border-white/10 hover:border-primary dark:hover:border-[#ffb4ab] transition-all cursor-crosshair group/db">
                                <div className="w-12 h-12 mb-3 bg-surface dark:bg-stone-950 flex items-center justify-center rounded-full border border-primary/10 dark:border-[#ffb4ab]/20 logo-glow group-hover/db:border-primary/40 transition-colors">
                                    <i className="fa-solid fa-database text-2xl text-primary dark:text-[#ffb4ab]"></i>
                                    {/* Using standard db icon since elephant is pro */}
                                </div>
                                <span className="text-[10px] text-primary/70 dark:text-[#ffb4ab]/70 font-mono mb-2 uppercase tracking-widest">Structured</span>
                                <span className="font-headline font-black text-xl lg:text-2xl uppercase dark:text-stone-100">PostgreSQL</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Soft Skills & Other Technical */}
                    <ScrollReveal className="md:col-span-7 bg-surface-container-highest dark:bg-stone-800 p-8 rounded-lg border border-primary/10 dark:border-white/5">
                        <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface dark:text-stone-100 mb-6 uppercase flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary dark:bg-[#ffb4ab]"></span>
                            Core_Logic & Soft_Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-2 bg-white dark:bg-stone-900 border border-primary/10 dark:border-white/10 text-stone-700 dark:text-stone-300 text-sm font-medium hover:text-primary dark:hover:text-[#ffb4ab] transition-colors rounded">Problem-solving</span>
                            <span className="px-3 py-2 bg-white dark:bg-stone-900 border border-primary/10 dark:border-white/10 text-stone-700 dark:text-stone-300 text-sm font-medium hover:text-primary dark:hover:text-[#ffb4ab] transition-colors rounded">Analytical Thinking</span>
                            <span className="px-3 py-2 bg-white dark:bg-stone-900 border border-primary/10 dark:border-white/10 text-stone-700 dark:text-stone-300 text-sm font-medium hover:text-primary dark:hover:text-[#ffb4ab] transition-colors rounded">Algorithmic Design</span>
                            <span className="px-3 py-2 bg-white dark:bg-stone-900 border border-primary/10 dark:border-white/10 text-stone-700 dark:text-stone-300 text-sm font-medium hover:text-primary dark:hover:text-[#ffb4ab] transition-colors rounded">System Architecture</span>
                            <span className="px-3 py-2 bg-white dark:bg-stone-900 border border-primary/10 dark:border-white/10 text-stone-700 dark:text-stone-300 text-sm font-medium hover:text-primary dark:hover:text-[#ffb4ab] transition-colors rounded">Communication</span>
                            <span className="px-3 py-2 bg-white dark:bg-stone-900 border border-primary/10 dark:border-white/10 text-stone-700 dark:text-stone-300 text-sm font-medium hover:text-primary dark:hover:text-[#ffb4ab] transition-colors rounded">Collaboration</span>
                            <span className="px-3 py-2 bg-white dark:bg-stone-900 border border-primary/10 dark:border-white/10 text-stone-700 dark:text-stone-300 text-sm font-medium hover:text-primary dark:hover:text-[#ffb4ab] transition-colors rounded">Adaptability</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="md:col-span-5 bg-surface-container-low dark:bg-stone-900 p-8 rounded-lg relative overflow-hidden border border-primary/10 dark:border-white/5">
                        <div className="absolute -bottom-4 -right-4 opacity-5 dark:opacity-10">
                            <span className="material-symbols-outlined text-[120px] dark:text-white" data-icon="settings_suggest">settings_suggest</span>
                        </div>
                        <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface dark:text-stone-100 mb-6 uppercase z-10 relative">Other_Technical</h3>
                        <div className="space-y-4 z-10 relative">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary dark:text-[#ffb4ab]">check_circle</span>
                                <span className="text-stone-700 dark:text-stone-300 text-sm font-bold">Excel Data Management</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary dark:text-[#ffb4ab]">check_circle</span>
                                <span className="text-stone-700 dark:text-stone-300 text-sm font-bold">Hardware & Software Diagnostics</span>
                            </div>
                            <div className="inline-block mt-4 px-4 py-1.5 bg-primary/10 dark:bg-[#ffb4ab]/10 border border-primary/20 dark:border-[#ffb4ab]/20 text-primary dark:text-[#ffb4ab] text-xs font-black tracking-widest uppercase rounded">
                                NCII CERTIFIED COMPUTER SYSTEMS SERVICING
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* System Visual Decoration */}
                <ScrollReveal className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 dark:opacity-20">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono tracking-widest text-stone-600 dark:text-stone-300 uppercase">Sys_Core_Load</span>
                        <div className="h-1 bg-surface-container-highest dark:bg-stone-800 w-full"><div className="h-full bg-primary dark:bg-[#ffb4ab] w-2/3"></div></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono tracking-widest text-stone-600 dark:text-stone-300 uppercase">Neural_Stability</span>
                        <div className="h-1 bg-surface-container-highest dark:bg-stone-800 w-full"><div className="h-full bg-primary dark:bg-[#ffb4ab] w-4/5"></div></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono tracking-widest text-stone-600 dark:text-stone-300 uppercase">Data_Throughput</span>
                        <div className="h-1 bg-surface-container-highest dark:bg-stone-800 w-full"><div className="h-full bg-primary dark:bg-[#ffb4ab] w-1/2"></div></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-mono tracking-widest text-stone-600 dark:text-stone-300 uppercase">Deploy_Ready</span>
                        <div className="h-1 bg-surface-container-highest dark:bg-stone-800 w-full"><div className="h-full bg-primary dark:bg-[#ffb4ab] w-full"></div></div>
                    </div>
                </ScrollReveal>
            </main>
            <Footer />
            </div>
        </PageTransition>
    );
};

export default SkillsPage;
