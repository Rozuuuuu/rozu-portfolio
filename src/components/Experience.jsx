import ScrollReveal from './ScrollReveal';

const Experience = () => {
    return (
        <section className="bg-neutral-50 dark:bg-neutral-950 py-24 transition-colors duration-300" id="experience">
            <ScrollReveal className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div>
                        <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs">The Path</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 text-black dark:text-white">Professional Journey</h2>
                        <p className="mt-6 text-neutral-500 dark:text-neutral-400 leading-relaxed">From freelance full-stack work to leading production delivery and enterprise SAP training — building, shipping, and owning software end to end.</p>
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                        {[
                            { role: 'SAP ABAP Trainee / Program Delegate', company: 'Accenture · Internship | Cebu, Central Visayas, Philippines', period: 'Feb 2026 - Apr 2026', desc: 'Selected as a delegate for a 320-hour intensive SAP Advanced Business Application Programming (ABAP) bootcamp through Accenture Technology Academy. Gained hands-on experience with SAP ABAP, the proprietary language for developing and customizing enterprise SAP applications, alongside enterprise software development practices and methodologies.' },
                            { role: 'Technical Manager | Full Stack Developer', company: 'Buy@ndBuild · Contract | Cebu, Central Visayas, Philippines · Hybrid', period: 'May 2025 - Mar 2026', desc: 'Architected and led the end-to-end implementation of a real-time logistics dashboard, defining system architecture and selecting the full tech stack. Delivered a production application adopted by internal operations teams, owning it from initial design through deployment. Integrated AI-assisted development tools — Claude, Gemini, and Codex — for code generation, review, and debugging to accelerate delivery, while managing technical decisions and timelines independently.' },
                            { role: 'Full Stack JavaScript Developer', company: 'Self Employed · Freelance | Cebu, Central Visayas, Philippines · Remote', period: 'Feb 2024 - Nov 2025', desc: 'Developed core user-facing features and administered full-stack system health across multiple client projects, sourced through direct outreach and referrals, maintaining 99.9% uptime. Owned feature rollouts end to end and built RESTful APIs and webhook integrations to connect third-party services and automate event-driven workflows. Worked directly with clients to scope, deliver, and iterate on production features under real deadlines.' },
                        ].map(({ role, company, period, desc }) => (
                            <div key={role} className="bg-white dark:bg-neutral-900 p-8 rounded-lg transition-all hover:translate-x-2 border border-neutral-200 dark:border-neutral-800">
                                <div className="flex flex-wrap justify-between items-start mb-4 gap-3">
                                    <div>
                                        <h3 className="text-xl font-black text-black dark:text-white">{role}</h3>
                                        <p className="text-neutral-500 dark:text-neutral-400 font-bold text-sm">{company}</p>
                                    </div>
                                    <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded">{period}</span>
                                </div>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Experience;
