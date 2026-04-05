import PageTransition from '../components/PageTransition';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <PageTransition>
            <header className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto" id="home">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container font-label text-xs uppercase tracking-widest font-bold">
                            Rozu's Portfolio
                        </div>
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none text-on-surface dark:text-stone-100">
                            Lloyd C. <br /> <span className="text-primary italic">Rosales</span>
                        </h1>
                        <p className="text-xl text-on-surface-variant dark:text-stone-400 max-w-lg leading-relaxed">
                            Software Engineer & Systems Architect focusing on high-performance editorial digital experiences and kinetic interface design.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <button onClick={() => navigate('/projects')} className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                Explore Projects
                            </button>
                            <button onClick={() => {
                                const link = document.createElement('a');
                                link.href = '/Resume-LloydRosales.pdf';
                                link.download = 'rosales_resume.pdf';
                                link.click();
                            }} className="bg-surface-container-high dark:bg-stone-800 text-primary dark:text-stone-200 px-8 py-4 rounded-lg font-bold hover:bg-surface-container-highest dark:hover:bg-stone-700 transition-colors">
                                Download Resume
                            </button>
                        </div>
                    </div>
                    <div className="relative group">
                        {/* Soft Background Circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>

                        {/* Profile Image Container */}
                        <div className="relative z-10 aspect-[4/5] md:aspect-square flex items-end justify-center overflow-visible">
                            <img
                                className="w-full h-full object-contain drop-shadow-2xl transition-all duration-700 hover:scale-[1.03]"
                                src="/lloyd-pic.png"
                                alt="Lloyd Rosales"
                            />
                        </div>

                        {/* Philosophy Card */}
                        <div className="absolute -bottom-6 -left-6 z-20 bg-surface-container-lowest dark:bg-stone-900 border border-surface-container-high dark:border-stone-800 p-6 rounded-xl shadow-2xl max-w-[240px] transform transition-transform group-hover:-translate-y-2">
                            <p className="text-xs font-bold uppercase text-primary tracking-[0.2em] mb-2">Philosophy</p>
                            <p className="text-sm font-medium italic text-on-surface dark:text-stone-200 leading-snug">
                                "Performance is the baseline. Soul is the differentiator."
                            </p>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 border-2 border-primary/20 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </header>
        </PageTransition>
    );
};

export default Hero;
