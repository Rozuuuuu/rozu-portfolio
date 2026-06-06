import { useState } from 'react';
// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m, AnimatePresence } from 'framer-motion';
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

const AchievementsPage = () => {
    const [activeTab, setActiveTab] = useState('achievements');

    // Extract the primary PhilTech achievement
    const philtechAchievement = featured.find(item => item.id === 3);
    const otherFeatured = featured.filter(item => item.id !== 3);

    const tabs = [
        { id: 'achievements', label: 'Achievements', icon: 'emoji_events' },
        { id: 'spotlight', label: 'Special Recognition', icon: 'stars' },
        { id: 'milestones', label: 'Representation & Certification', icon: 'verified' }
    ];

    return (
        <PageTransition>
            <SEO 
                title="Achievements - Lloyd C. Rosales" 
                description="A list of my technical awards, hackathon wins, and professional achievements." 
                path="/achievements" 
            />
            <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
                <main className="pt-32 pb-24">
                    {/* Hero Header */}
                    <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
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

                    {/* PhilTech Innovathon 2026 - Biggest & Featured Hero Section */}
                    {philtechAchievement && (
                        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
                            <ScrollReveal>
                                <div className="relative group overflow-hidden rounded-2xl bg-neutral-50 dark:bg-neutral-950 border-2 border-black dark:border-white p-8 md:p-12 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5">
                                    {/* Glowing Accent Corners */}
                                    <div className="absolute -right-32 -top-32 w-80 h-80 bg-neutral-900/10 dark:bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute -left-32 -bottom-32 w-80 h-80 bg-neutral-900/10 dark:bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                                    
                                    <div className="flex flex-col lg:flex-row gap-10 items-center relative z-10">
                                        {/* Image Section */}
                                        <div className="w-full lg:w-1/2 relative min-h-[300px] md:min-h-[380px] rounded-xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 flex-shrink-0">
                                            {/* [PERF FIX 4] Image lazy loading and dimensions */}
                                            <img 
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                                                src={philtechAchievement.img} 
                                                alt={philtechAchievement.imgAlt} 
                                                width="800"
                                                height="450"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                                            {/* Floating Double-Award Badge */}
                                            <div className="absolute top-4 left-4 bg-black text-white dark:bg-white dark:text-black font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-neutral-800 dark:border-neutral-200">
                                                <span className="material-symbols-outlined text-xs">workspace_premium</span>
                                                Best Collaborative Catalysts
                                            </div>
                                            {/* Floating Role Badge */}
                                            <div className="absolute top-4 right-4 bg-white/95 text-black dark:bg-black/95 dark:text-white font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-xs">engineering</span>
                                                Role: AI Engineer
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="w-full lg:w-1/2 flex flex-col">
                                            <div className="flex items-center gap-2 mb-4 text-black dark:text-white">
                                                <span className="material-symbols-outlined text-2xl">emoji_events</span>
                                                <span className="font-bold text-[10px] uppercase tracking-[0.25em] font-mono">Featured Achievement</span>
                                            </div>
                                            
                                            <h2 className="font-headline text-3xl md:text-5xl font-black tracking-tighter leading-none mb-2 text-black dark:text-white">
                                                {philtechAchievement.title}
                                            </h2>
                                            
                                            <p className="text-neutral-500 dark:text-neutral-400 font-bold text-xs md:text-sm mb-4 uppercase tracking-widest font-mono">
                                                {philtechAchievement.subtitle} — <span className="text-black dark:text-white underline decoration-wavy decoration-neutral-450 dark:decoration-neutral-600">{philtechAchievement.place}</span>
                                            </p>

                                            {/* Highlight Role Block */}
                                            <div className="flex items-center gap-2 mb-6 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2 w-fit">
                                                <span className="material-symbols-outlined text-sm text-neutral-800 dark:text-neutral-200">engineering</span>
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                                                    Core Role: <span className="text-black dark:text-white font-black">AI Engineer</span>
                                                </span>
                                            </div>
                                            
                                            <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed mb-8 font-body">
                                                {philtechAchievement.desc}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {philtechAchievement.tags?.map(t => (
                                                    <span 
                                                        key={t} 
                                                        className="px-3.5 py-1.5 border rounded-full text-[9px] font-mono font-bold uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black border-black dark:border-white transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>
                    )}

                    {/* Tabs Navigation */}
                    <section className="max-w-7xl mx-auto px-6 md:px-8 mb-12">
                        <ScrollReveal>
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6 gap-6">
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">Filter Recognition</span>
                                
                                <div className="flex flex-wrap gap-2">
                                    {tabs.map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`relative px-5 py-2.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 z-10 ${
                                                    isActive 
                                                    ? 'text-white dark:text-black font-extrabold' 
                                                    : 'text-neutral-500 hover:text-black dark:hover:text-white'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                                                {tab.label}
                                                {isActive && (
                                                    <m.div
                                                        layoutId="activeTabIndicator"
                                                        className="absolute inset-0 bg-black dark:bg-white rounded-full -z-10 shadow-md"
                                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </ScrollReveal>
                    </section>

                    {/* Tab Panels */}
                    <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24 min-h-[400px]">
                        <ErrorBoundary>
                            <AnimatePresence mode="wait">
                                <m.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {activeTab === 'achievements' && (
                                        otherFeatured?.length > 0 ? (
                                            <div className="flex flex-col gap-8">
                                                {otherFeatured.map(({ id, place, placeColor, icon, iconColor, title, subtitle, desc, tags, tagColor, img, imgAlt, layout }) => (
                                                    <ScrollReveal key={id}>
                                                        <div className={`bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col ${layout === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} shadow-md dark:shadow-black/40 group`}>
                                                            <div className="md:w-2/5 relative min-h-[260px] overflow-hidden flex-shrink-0">
                                                                {/* [PERF FIX 4] Image lazy loading and dimensions */}
                                                                {img ? <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt={imgAlt} width="800" height="450" loading="lazy" decoding="async" /> : <ImgPlaceholder alt={imgAlt} />}
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
                                            <p className="text-sm text-neutral-500 italic font-mono">No achievements found.</p>
                                        )
                                    )}

                                    {activeTab === 'spotlight' && (
                                        spotlight?.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {spotlight.map(({ id, icon, iconColor, title, subtitle, desc, img, imgAlt }) => (
                                                    <ScrollReveal key={id}>
                                                        <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-md dark:shadow-black/40 group h-full flex flex-col hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
                                                            <div className="relative h-52 overflow-hidden flex-shrink-0">
                                                                {/* [PERF FIX 4] Image lazy loading and dimensions */}
                                                                {img ? <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt={imgAlt} width="800" height="450" loading="lazy" decoding="async" /> : <ImgPlaceholder alt={imgAlt} />}
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
                                            <p className="text-sm text-neutral-500 italic font-mono">No special recognition found.</p>
                                        )
                                    )}

                                    {activeTab === 'milestones' && (
                                        milestones?.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {milestones.map(({ id, icon, title, subtitle, desc, img, imgAlt }) => (
                                                    <ScrollReveal key={id}>
                                                        <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-md dark:shadow-black/40 group flex flex-col h-full hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
                                                            <div className="relative h-52 overflow-hidden flex-shrink-0">
                                                                {/* [PERF FIX 4] Image lazy loading and dimensions */}
                                                                {img ? <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt={imgAlt} width="800" height="450" loading="lazy" decoding="async" /> : <ImgPlaceholder alt={imgAlt} />}
                                                            </div>
                                                            <div className="p-6 flex flex-col justify-center flex-grow">
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
                                            <p className="text-sm text-neutral-500 italic font-mono">No representations or certifications found.</p>
                                        )
                                    )}
                                </m.div>
                            </AnimatePresence>
                        </ErrorBoundary>
                    </section>

                    <ConnectWithMe />
                </main>
                <SharedFooter />
            </div>
        </PageTransition>
    );
};

export default AchievementsPage;
