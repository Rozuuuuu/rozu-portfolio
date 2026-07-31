import ScrollReveal from './ScrollReveal';

const roles = [
    {
        role: 'SAP ABAP Trainee / Program Delegate',
        company: 'Accenture',
        type: 'Internship',
        location: 'Cebu, Central Visayas',
        period: 'Feb 2026 — Apr 2026',
        desc: 'Selected as a delegate for a 320-hour intensive SAP Advanced Business Application Programming (ABAP) bootcamp through Accenture Technology Academy. Gained hands-on experience with SAP ABAP — the proprietary language for developing and customizing enterprise SAP applications — alongside enterprise software development practices and methodologies.',
    },
    {
        role: 'Technical Manager | Full Stack Developer',
        company: 'Buy@ndBuild',
        type: 'Contract · Hybrid',
        location: 'Cebu, Central Visayas',
        period: 'May 2025 — Mar 2026',
        desc: 'Architected and led the end-to-end implementation of a real-time logistics dashboard, defining system architecture and selecting the full tech stack. Delivered a production application adopted by internal operations teams, owning it from initial design through deployment. Integrated AI-assisted tooling — Claude, Gemini, and Codex — for code generation, review, and debugging to accelerate delivery, while managing technical decisions and timelines independently.',
    },
    {
        role: 'Full Stack JavaScript Developer',
        company: 'Self Employed',
        type: 'Freelance · Remote',
        location: 'Cebu, Central Visayas',
        period: 'Feb 2024 — Nov 2025',
        desc: 'Developed core user-facing features and administered full-stack system health across multiple client projects — sourced through direct outreach and referrals — while maintaining 99.9% uptime. Owned feature rollouts end to end and built RESTful APIs and webhook integrations to connect third-party services and automate event-driven workflows. Worked directly with clients to scope, deliver, and iterate on production features under real deadlines.',
    },
];

const Experience = () => {
    return (
        <section className="bg-neutral-50 dark:bg-neutral-950 py-24 transition-colors duration-300" id="experience">
            <style>{`
                .tl { position: relative; }
                .tl::before {
                    content: '';
                    position: absolute;
                    left: 7px;
                    top: 10px;
                    bottom: 10px;
                    width: 2px;
                    background: linear-gradient(to bottom, transparent, #d4d4d4 12%, #d4d4d4 88%, transparent);
                }
                .dark .tl::before {
                    background: linear-gradient(to bottom, transparent, #262626 12%, #262626 88%, transparent);
                }
                .tl-item { position: relative; padding-left: 2.75rem; padding-bottom: 2.75rem; }
                .tl-item:last-child { padding-bottom: 0; }
                .tl-dot {
                    position: absolute;
                    left: 0;
                    top: 6px;
                    width: 16px;
                    height: 16px;
                    border-radius: 9999px;
                    background: #fafafa;
                    border: 2px solid #a3a3a3;
                    z-index: 1;
                    transition: border-color 0.25s, transform 0.25s;
                }
                .dark .tl-dot { background: #0a0a0a; border-color: #525252; }
                .tl-dot.is-current {
                    background: #000;
                    border-color: #000;
                    box-shadow: 0 0 0 4px rgba(0,0,0,0.08);
                }
                .dark .tl-dot.is-current {
                    background: #fff;
                    border-color: #fff;
                    box-shadow: 0 0 0 4px rgba(255,255,255,0.12);
                }
                .tl-item:hover .tl-dot { border-color: #000; transform: scale(1.15); }
                .dark .tl-item:hover .tl-dot { border-color: #fff; }
            `}</style>

            <ScrollReveal className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs">The Path</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 text-black dark:text-white">Professional Journey</h2>
                        <p className="mt-6 text-neutral-500 dark:text-neutral-400 leading-relaxed">From freelance full-stack work to leading production delivery and enterprise SAP training — building, shipping, and owning software end to end.</p>
                    </div>

                    <div className="lg:col-span-2">
                        <ol className="tl">
                            {roles.map(({ role, company, type, location, period, desc }, i) => (
                                <li key={role} className="tl-item group">
                                    <span className={`tl-dot ${i === 0 ? 'is-current' : ''}`} aria-hidden="true"></span>
                                    <div className="bg-white dark:bg-neutral-900 p-7 rounded-lg border border-neutral-200 dark:border-neutral-800 transition-all duration-300 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 group-hover:translate-x-1">
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
                                            <span className="font-mono text-xs font-bold text-black dark:text-white tracking-widest uppercase">{period}</span>
                                            {i === 0 && (
                                                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 rounded-full px-2 py-0.5">Latest</span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-black text-black dark:text-white leading-snug">{role}</h3>
                                        <p className="mt-1 text-sm font-bold text-neutral-600 dark:text-neutral-300">
                                            {company}
                                            <span className="text-neutral-400 dark:text-neutral-500 font-medium"> · {type}</span>
                                        </p>
                                        <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium mt-0.5">{location}</p>
                                        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Experience;
