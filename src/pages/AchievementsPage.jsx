import SharedNav from '../components/SharedNav';
import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';

/* ─── Reusable Image Placeholder ─── */
const ImgPlaceholder = ({ alt }) => (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-stone-200 dark:bg-stone-700 gap-3">
        <span className="material-symbols-outlined text-5xl text-stone-400 dark:text-stone-500">add_photo_alternate</span>
        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 text-center px-4">{alt}</span>
    </div>
);

/* ─── Achievement data ─── */
const featured = [
    {
        id: 1,
        place: '3rd Place',
        placeColor: 'text-amber-600 dark:text-amber-400',
        icon: 'emoji_events',
        iconColor: 'text-amber-600 dark:text-amber-400',
        title: 'HackEstate Hackathon Competition 2025',
        subtitle: 'PropTech Filipino Homes',
        desc: 'Competed in a PropTech-focused hackathon tackling real estate innovation in the Philippine market. Delivered a full-stack solution addressing affordable housing discovery through data and design.',
        tags: ['PropTech', 'Hackathon'],
        tagColor: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        img: '/PropTech.jpg',
        imgAlt: 'HackEstate PropTech Hackathon',
        layout: 'left',
    },
    {
        id: 2,
        place: '2nd Place',
        placeColor: 'text-stone-500 dark:text-stone-300',
        icon: 'emoji_events',
        iconColor: 'text-stone-500 dark:text-stone-300',
        title: 'CCS Days Hackathon Competition 2023',
        subtitle: 'USPF CCS Days',
        desc: 'Placed 2nd in the College of Computer Studies Hackathon at the University of Southern Philippines Foundation, showcasing rapid prototyping and full-stack development under pressure.',
        tags: ['CCS Days', 'USPF 2023'],
        tagColor: 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-600',
        img: '/CCS hackathon.jfif',
        imgAlt: 'CCS Days Hackathon USPF 2023',
        layout: 'right',
    },
    {
        id: 3,
        place: '2nd Runner-Up',
        placeColor: 'text-primary dark:text-red-400',
        icon: 'workspace_premium',
        iconColor: 'text-primary dark:text-red-400',
        title: 'Philtech Innovathon 2026',
        subtitle: 'PhilTech Innovathon Competition',
        desc: 'Achieved 2nd Runner-Up overall and took the Best in Collaborative Catalysts special award in National Level Competition — recognizing outstanding teamwork, cross-disciplinary synergy, and innovation under the Philtech framework. Held in Bonifacio Global City (BGC) Taguig City, Metro Manila',
        tags: ['Philtech', 'Innovathon 2026', 'Collaborative Catalysts'],
        tagColor: 'bg-red-50 dark:bg-red-900/20 text-primary dark:text-red-400 border-red-200 dark:border-red-800',
        img: '/Philtech.jpg',
        imgAlt: 'Philtech Innovathon 2026',
        layout: 'left',
    },
];

const spotlight = [
    {
        id: 4,
        icon: 'design_services',
        iconColor: 'text-blue-600 dark:text-blue-400',
        bgGradient: false,
        title: 'Best in Logo & Most Promising',
        subtitle: 'Hackathon Competition 2023',
        desc: 'Dual recognition for outstanding visual identity design and future potential among all competing teams at the 2023 hackathon.',
        img: '/Best in Logo.jfif',
        imgAlt: 'Best in Logo & Most Promising award',
    },
    {
        id: 5,
        icon: 'brush',
        iconColor: 'text-purple-600 dark:text-purple-400',
        bgGradient: false,
        title: 'Top UX Interface',
        subtitle: 'PropTech SinulogFest Hackathon 2026',
        desc: 'Awarded Top UX Interface for delivering the most intuitive and visually refined user experience among all participating teams at the SinulogFest PropTech Hackathon.',
        img: '/SinulogFest.jpg',
        imgAlt: 'PropTech SinulogFest Hackathon 2026',
    },
];

const milestones = [
    {
        id: 6,
        icon: 'military_tech',
        title: 'CESAFI Computer Quiz Bowl',
        subtitle: 'Representative – USPF 2025',
        desc: 'Represented the University of Southern Philippines Foundation in the CESAFI Computer Quiz Bowl, competing against elite CS students across Cebu City institutions.',
        img: '/Quizbowl.jfif',
        imgAlt: 'CESAFI Quiz Bowl photo',
    },
    {
        id: 7,
        icon: 'verified',
        title: 'TOPCIT Level 3 – Competent Achiever',
        subtitle: 'Test of Practical Competency in IT',
        desc: 'Attained Level 3 (Competent) in the TOPCIT Examination — a nationally standardized assessment of practical IT skills including software engineering, data structures, and problem solving.',
        img: '/Topcit.jfif',
        imgAlt: 'TOPCIT Level 3 Competent Achiever certificate',
    },
];

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

                {/* ── CTA ── */}
                <section className="max-w-7xl mx-auto px-6 md:px-8 mt-20 text-center">
                    <ScrollReveal>
                        <div className="bg-stone-900 dark:bg-stone-800 text-white rounded-xl py-16 px-8 relative overflow-hidden border border-stone-700">
                            <div className="relative z-10">
                                <h2 className="font-headline text-4xl font-black mb-6 tracking-tight text-white">
                                    Let's build the next <span className="text-red-400 italic">Win</span> together.
                                </h2>
                                <p className="text-stone-400 mb-10 max-w-xl mx-auto">
                                    Open for high-impact collaborations, hackathon teams, and freelance partnerships.
                                </p>
                                <button
                                    className="text-white font-bold px-10 py-4 rounded-lg tracking-tight hover:scale-105 transition-transform shadow-lg shadow-red-900/30"
                                    style={{ background: 'linear-gradient(135deg, #bc000a 0%, #e61919 100%)' }}
                                >
                                    Let's Work Together
                                </button>
                            </div>
                            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#bc000a 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        </div>
                    </ScrollReveal>
                </section>

            </main>

            <SharedFooter />
        </div>
    </PageTransition>
);

export default AchievementsPage;
