import ScrollReveal from './ScrollReveal';

const Experience = () => {
    return (
        <section className="bg-surface-container-low dark:bg-stone-900 py-24 transition-colors duration-300" id="experience">
            <ScrollReveal className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div>
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">The Path</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 dark:text-stone-100">Professional Journey</h2>
                        <p className="mt-6 text-on-surface-variant dark:text-stone-400 leading-relaxed">A decade of engineering excellence across diverse industries, from startups to enterprise-level architecture.</p>
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                        {[
                            { role: 'Referral Freelancing - Full Stack JavaScript Developer', company: 'Cebu City, Philippines', period: '2024 - 2025', desc: 'Developed core user-facing features and administered full-stack system health for multiple client projects, ensuring 99.9% availability and seamless feature rollouts.' },
                            { role: 'Freelance Excel Data Entry', company: 'Cebu City, Philippines', period: '2025', desc: 'Processed and maintained 50,000+ rows of operational data with 100% accuracy, creating dynamic templates that cut data turnaround time in half.' },
                            { role: 'Technical Manager', company: 'Buy@ndBuild | Cebu City, Philippines', period: '2025-2026', desc: 'Architected and led the end‑to‑end implementation of a real‑time logistics dashboard, defining the system architecture, selecting the tech stack, and delivering a fully functional application adopted by internal operations teams.' },
                        ].map(({ role, company, period, desc }) => (
                            <div key={role} className="bg-surface-container-lowest dark:bg-stone-800 p-8 rounded-lg transition-all hover:translate-x-2">
                                <div className="flex flex-wrap justify-between items-start mb-4 gap-3">
                                    <div>
                                        <h3 className="text-xl font-black dark:text-stone-100">{role}</h3>
                                        <p className="text-primary font-bold text-sm">{company}</p>
                                    </div>
                                    <span className="text-xs font-bold text-on-surface-variant dark:text-stone-400 uppercase tracking-widest bg-surface-container-high dark:bg-stone-700 px-3 py-1 rounded">{period}</span>
                                </div>
                                <p className="text-sm text-on-surface-variant dark:text-stone-400 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Experience;
