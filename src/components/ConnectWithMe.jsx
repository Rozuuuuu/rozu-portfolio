import { useNavigate } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import SocialCards from './SocialCards';

const ConnectWithMe = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-8" id="connect">
            <ScrollReveal>
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-12 md:p-20">
                    {/* Background effects */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:opacity-10" style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 dark:bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 dark:bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left: text content */}
                        <div className="flex-1 text-center lg:text-left">
                            <span className="inline-block text-primary dark:text-red-500 font-bold tracking-[0.3em] uppercase text-xs font-mono mb-4">
                                Let's Connect
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black dark:text-white mb-6 leading-tight">
                                Have a project{' '}
                                <span className="text-neutral-500 dark:text-neutral-400 italic">in mind?</span>
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0 font-body">
                                Open for high-impact collaborations, freelance partnerships, and full-time roles in design-led engineering teams.
                            </p>

                            {/* Contact info */}
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8 justify-center lg:justify-start">
                                <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                                    <span className="material-symbols-outlined text-black dark:text-white text-lg">alternate_email</span>
                                    <span className="text-sm font-medium">code.with.lloyd@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                                    <span className="material-symbols-outlined text-black dark:text-white text-lg">location_on</span>
                                    <span className="text-sm font-medium">Cebu City, Philippines</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => navigate('/contact')}
                                className="inline-flex items-center gap-3 px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-sm bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/30 dark:shadow-white/10 hover:scale-105 active:scale-95 transition-all"
                            >
                                Let's Work Together
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>

                        {/* Right: Social Cards — swapped from Hero */}
                        <div className="flex-shrink-0">
                            <SocialCards />
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default ConnectWithMe;
