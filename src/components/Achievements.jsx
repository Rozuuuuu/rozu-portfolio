import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { featured } from '../data/achievementsData';
import Icon from './Icon';

const Achievements = () => {
    // Take the top 3 featured achievements to display on the home page
    const items = featured.slice(0, 3);

    return (
        <section className="py-16 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300" id="achievements">
            <ScrollReveal className="max-w-5xl mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs">Accolades</span>
                        <h2 className="text-3xl font-black tracking-tight mt-2 text-black dark:text-white">Achievements</h2>
                        <p className="text-neutral-500 dark:text-neutral-400 mt-3">Recognition of technical excellence and competitive innovation.</p>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {items.map(({ id, subtitle, title, img }) => (
                        <div key={id} className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden group border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors duration-300 shadow-md dark:shadow-black/20">
                            {/* Image */}
                            <div className="h-48 bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                                {/* [PERF FIX 4] Image lazy loading and dimensions */}
                                <img
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                    src={img}
                                    alt={title}
                                    width="800"
                                    height="450"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {/* Legibility scrim behind the overlaid label */}
                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                                {/* Overlaid label — stays readable over busy photos thanks to the scrim */}
                                <span className="absolute bottom-3 left-4 right-4 text-white text-xs uppercase tracking-widest font-bold drop-shadow-sm">
                                    {subtitle}
                                </span>
                            </div>
                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-xl font-black text-black dark:text-white leading-snug">{title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More */}
                <div className="flex justify-center mt-12">
                    <Link
                        to="/achievements"
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-sm uppercase tracking-widest rounded-lg transition-all duration-300 group"
                    >
                        View All Achievements
                        <Icon name="arrow_forward" className="text-base group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Achievements;
