import SharedNav from '../components/SharedNav';
import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import ConnectWithMe from '../components/ConnectWithMe';
import { featured, spotlight, milestones } from '../data/achievementsData';

/* ─── Reusable Image Placeholder ─── */
const ImgPlaceholder = ({ alt }) => (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-stone-200 dark:bg-stone-700 gap-3">
        <span className="material-symbols-outlined text-5xl text-stone-400 dark:text-stone-500">add_photo_alternate</span>
        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 text-center px-4">{alt}</span>
    </div>
);

const AchievementsPage = () => (
    <PageTransition>
        <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
            <SharedNav />

            <main className="pt-32 pb-24">

                {/* ── Hero Banner ── */}
                <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
                    <ScrollReveal>
                        <div className="relative overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-900 p-12 md:p-20 border border-stone-200 dark:border-stone-800">
                            <div className="relative z-10 max-w-2xl">
                                <span className="font-label text-primary dark:text-red-400 font-bold uppercase tracking-widest text-xs mb-4 block">
                                    Milestones &amp; Recognition
                                </span>
                                <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 text-stone-900 dark:text-stone-50">
                                    Earned in the{' '}
                                    <span className="text-primary dark:text-red-400 italic">Arena.</span>
                                </h1>
                                <p className="font-body text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                                    A record of competitive victories, design recognition, and professional certifications — each one a proof of work.
                                </p>   
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </ScrollReveal>
                </section>

                {/* ── Featured (Wide cards with image) ── */}
                <section className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
                    <ScrollReveal>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-6 block">Featured Achievements</span>
                    </ScrollReveal>
                    <div className="flex flex-col gap-8">
                        {featured.map(({ id, place, placeColor, icon, iconColor, title, subtitle, desc, tags, tagColor, img, imgAlt, layout }) => (
                            <ScrollReveal key={id}>
                                <div className={`bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden flex flex-col ${layout === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} shadow-md dark:shadow-black/40 group`}>
                                    {/* Image slot */}
                                    <div className="md:w-2/5 relative min-h-[260px] overflow-hidden flex-shrink-0">
                                        {img
                                            ? <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt={imgAlt} />
                                            : <ImgPlaceholder alt={imgAlt} />
                                        }
                                    </div>
                                    {/* Content */}
                                    <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                                        <div className={`flex items-center gap-2 mb-4 ${placeColor}`}>
                                            <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
                                            <span className="font-bold text-xs uppercase tracking-widest">{place}</span>
                                        </div>
                                        <h2 className="font-headline text-2xl md:text-3xl font-extrabold tracking-tight mb-1 text-stone-900 dark:text-stone-50">{title}</h2>
                                        <p className="text-primary dark:text-red-400 font-bold text-sm mb-4">{subtitle}</p>
                                        <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-6">{desc}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map(t => (
                                                <span key={t} className={`px-3 py-1 border rounded-full text-[10px] font-bold uppercase tracking-wider ${tagColor}`}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

                {/* ── Spotlight (2-col with image top) ── */}
                <section className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
                    <ScrollReveal>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-6 block">Special Recognition</span>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {spotlight.map(({ id, icon, iconColor, title, subtitle, desc, img, imgAlt }) => (
                            <ScrollReveal key={id}>
                                <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-md dark:shadow-black/40 group h-full flex flex-col">
                                    {/* Image slot */}
                                    <div className="relative h-52 overflow-hidden flex-shrink-0">
                                        {img
                                            ? <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt={imgAlt} />
                                            : <ImgPlaceholder alt={imgAlt} />
                                        }
                                    </div>
                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className={`flex items-center gap-2 mb-3 ${iconColor}`}>
                                            <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
                                            <span className="font-bold text-xs uppercase tracking-widest">{subtitle}</span>
                                        </div>
                                        <h3 className="font-headline text-xl font-extrabold tracking-tight mb-3 text-stone-900 dark:text-stone-50">{title}</h3>
                                        <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

                {/* ── Milestones (2-col horizontal cards) ── */}
                <section className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
                    <ScrollReveal>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-6 block">Representation &amp; Certification</span>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {milestones.map(({ id, icon, title, subtitle, desc, img, imgAlt }) => (
                            <ScrollReveal key={id}>
                                <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-md dark:shadow-black/40 group flex flex-col sm:flex-row h-full">
                                    {/* Image slot */}
                                    <div className="sm:w-2/5 relative min-h-[180px] overflow-hidden flex-shrink-0">
                                        {img
                                            ? <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt={imgAlt} />
                                            : <ImgPlaceholder alt={imgAlt} />
                                        }
                                    </div>
                                    {/* Content */}
                                    <div className="sm:w-3/5 p-6 flex flex-col justify-center">
                                        <span className={`material-symbols-outlined text-primary dark:text-red-400 text-3xl mb-3 block`}>{icon}</span>
                                        <h3 className="font-headline text-lg font-extrabold tracking-tight mb-1 text-stone-900 dark:text-stone-50">{title}</h3>
                                        <p className="text-primary dark:text-red-400 font-bold text-xs mb-3">{subtitle}</p>
                                        <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>

                {/* Connect With Me CTA */}
                <ConnectWithMe />

            </main>

            <SharedFooter />
        </div>
    </PageTransition>
);

export default AchievementsPage;
