import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { featured } from '../data/achievementsData';

const Achievements = () => {
    // Take the top 3 featured achievements to display on the home page
    const items = featured.slice(0, 3);
    const overlays = ['bg-primary/10', 'bg-tertiary/10', 'bg-primary-container/10'];

    return (
        <section className="py-24 bg-[#fff0ee] dark:bg-stone-900 transition-colors duration-300" id="achievements">
            <ScrollReveal className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Accolades</span>
                        <h2 className="text-4xl font-black tracking-tight mt-2 text-stone-900 dark:text-white">Achievements</h2>
                        <p className="text-stone-500 dark:text-stone-400 mt-3">Recognition of technical excellence and competitive innovation.</p>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {items.map(({ id, subtitle, title, img }, index) => (
                        <div key={id} className="bg-white dark:bg-stone-800 rounded-xl overflow-hidden group border border-[#fddbd6] dark:border-stone-700 hover:border-primary/40 dark:hover:border-primary/40 transition-colors duration-300 shadow-md dark:shadow-black/20">
                            {/* Image */}
                            <div className="h-48 bg-[#fddbd6] dark:bg-stone-700 relative overflow-hidden">
                                <img
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                    src={img}
                                    alt={title}
                                />
                                <div className={`absolute inset-0 ${overlays[index % overlays.length]} mix-blend-overlay`}></div>
                            </div>
                            {/* Content */}
                            <div className="p-8">
                                <div className="text-primary text-xs uppercase tracking-widest font-bold mb-2">{subtitle}</div>
                                <h3 className="text-xl font-black text-stone-900 dark:text-white leading-snug">{title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More */}
                <div className="flex justify-center mt-12">
                    <Link
                        to="/achievements"
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#bc000a]/40 hover:border-primary bg-white dark:bg-stone-800 text-primary dark:text-red-400 hover:bg-primary hover:text-white font-bold text-sm uppercase tracking-widest rounded-lg transition-all duration-300 group"
                    >
                        View All Achievements
                        <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Achievements;
