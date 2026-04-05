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
                    <div className="relative">
                        <div className="aspect-square bg-surface-container-low dark:bg-stone-800 rounded-2xl overflow-hidden relative group">
                            <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyWgf-lzGNhFfT7k3UTvYpkM9hrLedbTd6EzmwarVr51xkDFytvJkatG_f_J7VGlXO8b0zqDho6sfo0nlT7DVyW-T4TmFyp8iBy5EtxiBUXSOqwda0O_O7irk1294Lv7w5-0QIo06u9dvfKrH9lEXQIallsusjOv7XI_OtfZRbRHgZOTMMWdtAxpS1vupekdN3NuV1bkXfDv6SZGaDIvikokbF_NlibjKrzR85tEttXo6fJkm0VHFW0bZGyqIXctTBm-lFtlybQJnE" alt="Lloyd Rosales" />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest dark:bg-stone-900 p-6 rounded-xl shadow-xl max-w-[240px]">
                            <p className="text-xs font-bold uppercase text-primary tracking-widest mb-2">Philosophy</p>
                            <p className="text-sm font-medium italic text-on-surface dark:text-stone-200 leading-snug">"Performance is the baseline. Soul is the differentiator."</p>
                        </div>
                    </div>
                </div>
            </header>
        </PageTransition>
    );
};

export default Hero;
