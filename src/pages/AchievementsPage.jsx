import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import ConnectWithMe from '../components/ConnectWithMe';
import ErrorBoundary from '../components/ErrorBoundary';
import { featured, spotlight, milestones } from '../data/achievementsData';
import SEO from '../components/SEO';

const ImgPlaceholder = ({ alt }) => (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-neutral-200 dark:bg-neutral-800 gap-3">
        <span className="material-symbols-outlined text-5xl text-neutral-400 dark:text-neutral-500">add_photo_alternate</span>
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 text-center px-4">{alt}</span>
    </div>
);

const AchievementsPage = () => (
    <PageTransition>
        <SEO 
            title="Achievements - Lloyd C. Rosales" 
            description="A list of my technical awards, hackathon wins, and professional achievements." 
            path="/achievements" 
        />
        <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
            <main className="pt-32 pb-24">
                <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
                    <ScrollReveal>
                        <div className="relative overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-950 p-12 md:p-20 border border-neutral-200 dark:border-neutral-800">
                            <div className="relative z-10 max-w-2xl">
                                <span className="font-label text-black dark:text-white font-bold uppercase tracking-widest text-xs mb-4 block">Milestones &amp; Recognition</span>
                                <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 text-black dark:text-white">
                                    Earned in the{' '}<span className="text-neutral-400 dark:text-neutral-500 italic">Arena.</span>
                                </h1>
                                <p className="font-body text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">A record of competitive victories, design recognition, and professional certifications — each one a proof of work.</p>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-black/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </ScrollReveal>
                </section>

                <section className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
                    <ScrollReveal><span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6 block">Featured Achievements</span></ScrollReveal>
                    <ErrorBoundary>
                        {featured?.length > 0 ? (
                            <div className="flex flex-col gap-8">
                                {featured.map(({ id, place, placeColor, icon, iconColor, title, subtitle, desc, tags, tagColor, img, imgAlt, layout }) => (
                                    <ScrollReveal key={id}>
                                        <div className={`bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col ${layout === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} shadow-md dark:shadow-black/40 group`}>
                                            <div className="md:w-2/5 relative min-h-[260px] overflow-hidden flex-shrink-0">
                                                {img ? <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt={imgAlt} /> : <ImgPlaceholder alt={imgAlt} />}
                                            </div>
                                            <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                                <div className={`flex items-center gap-2 mb-4 ${placeColor}`}>
                                                    <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
                                                    <span className="font-bold text-xs uppercase tracking-widest">{place}</span>
                                                </div>
                                                <h2 className="font-headline text-2xl md:text-3xl font-extrabold tracking-tight mb-1 text-black dark:text-white">{title}</h2>
                                                <p className="text-neutral-500 dark:text-neutral-400 font-bold text-sm mb-4">{subtitle}</p>
                                                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">{desc}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {tags?.map(t => (<span key={t} className={`px-3 py-1 border rounded-full text-[10px] font-bold uppercase tracking-wider ${tagColor}`}>{t}</span>))}
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-neutral-500 italic">No featured achievements found.</p>
                        )}
                    </ErrorBoundary>
                </section>

                <section className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
                    <ScrollReveal><span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6 block">Special Recognition</span></ScrollReveal>
                    <ErrorBoundary>
                        {spotlight?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {spotlight.map(({ id, icon, iconColor, title, subtitle, desc, img, imgAlt }) => (
                                    <ScrollReveal key={id}>
                                        <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-md dark:shadow-black/40 group h-full flex flex-col hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
                                            <div className="relative h-52 overflow-hidden flex-shrink-0">
                                                {img ? <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt={imgAlt} /> : <ImgPlaceholder alt={imgAlt} />}
                                            </div>
                                            <div className="p-8 flex flex-col flex-grow">
                                                <div className={`flex items-center gap-2 mb-3 ${iconColor}`}>
                                                    <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
                                                    <span className="font-bold text-xs uppercase tracking-widest">{subtitle}</span>
                                                </div>
                                                <h3 className="font-headline text-xl font-extrabold tracking-tight mb-3 text-black dark:text-white">{title}</h3>
                                                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{desc}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-neutral-500 italic">No special recognition found.</p>
                        )}
                    </ErrorBoundary>
                </section>

                <section className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
                    <ScrollReveal><span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6 block">Representation &amp; Certification</span></ScrollReveal>
                    <ErrorBoundary>
                        {milestones?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {milestones.map(({ id, icon, title, subtitle, desc, img, imgAlt }) => (
                                    <ScrollReveal key={id}>
                                        <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-md dark:shadow-black/40 group flex flex-col sm:flex-row lg:flex-col h-full hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
                                            <div className="sm:w-2/5 lg:w-full relative min-h-[180px] overflow-hidden flex-shrink-0">
                                                {img ? <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt={imgAlt} /> : <ImgPlaceholder alt={imgAlt} />}
                                            </div>
                                            <div className="sm:w-3/5 lg:w-full p-6 flex flex-col justify-center flex-grow">
                                                <span className="material-symbols-outlined text-black dark:text-white text-3xl mb-3 block">{icon}</span>
                                                <h3 className="font-headline text-lg font-extrabold tracking-tight mb-1 text-black dark:text-white">{title}</h3>
                                                <p className="text-neutral-500 dark:text-neutral-400 font-bold text-xs mb-3">{subtitle}</p>
                                                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{desc}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-neutral-500 italic">No representation & certification found.</p>
                        )}
                    </ErrorBoundary>
                </section>

                <ConnectWithMe />
            </main>
            <SharedFooter />
        </div>
    </PageTransition>
);

export default AchievementsPage;
