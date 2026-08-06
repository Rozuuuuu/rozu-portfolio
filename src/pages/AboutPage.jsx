import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m } from 'framer-motion';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { SharedFooter } from '../components/SharedFooter';
import Icon from '../components/Icon';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogData';

/* ─── Animation Variants ─── */
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

/* ─── Beyond the Terminal (compact) ─── */
const hobbies = [
    { icon: 'draw', label: 'Drawing' },
    { icon: 'fitness_center', label: 'Gym' },
    { icon: 'directions_run', label: 'Jogging' },
    { icon: 'casino', label: 'Board Games' },
    { icon: 'sports_volleyball', label: 'Volleyball' },
    { icon: 'sports_basketball', label: 'Basketball' },
];

/* ─── Core Focus ─── */
const coreFocus = [
    { icon: 'code', label: 'Full-Stack Web Development' },
    { icon: 'design_services', label: 'Frontend, UI & UX' },
    { icon: 'server', label: 'Backend & REST APIs' },
    { icon: 'dataset', label: 'Databases — SQL & MongoDB' },
    { icon: 'smart_toy', label: 'AI-Integrated Products' },
    { icon: 'integration_instructions', label: 'Enterprise SAP ABAP' },
];

/* ─── Timeline (tech journey, most recent first) ───
   Add an optional `media` array to any item to show small thumbnails beside it.
   Images render as clickable thumbnails; PDFs render as a "View PDF" chip.
   Files live in public/MyStory, referenced as '/MyStory/filename.jpg'. */
const timeline = [
    {
        year: '2026',
        intro: 'Proving it — at the highest level I’d faced yet. A national podium, a competency certification, a seat in an Accenture bootcamp, and finally the walk across the stage.',
        items: [
            { month: 'Jun', text: 'Graduated from USPF with a Bachelor of Science in Computer Science.', media: ['/MyStory/Graduated.jpg'] },
            { month: 'Apr', text: 'Attended the PSITE Student Congress 2026 at the Cebu Coliseum.', media: ['/MyStory/PSITE 2026.jpg'] },
            { month: 'Mar', text: 'Received my internship pin at the USPF CCS ceremony (delivering the BSCS batch message), placed 2nd at the USPF CCS Hackathon, and stepped back from freelancing to focus on my skills and portfolio.', media: ['/MyStory/Pinning.jpg', '/MyStory/Pinning (2).jpg', '/MyStory/Pinning (3).jpg', '/2ndplace2026.jpg'] },
            { month: 'Feb', text: 'Achieved TOPCIT Level 3 (Competent Achiever) and was selected as a delegate for Accenture’s 320-hour SAP ABAP bootcamp — hands-on enterprise SAP development through the Accenture Technology Academy.', media: ['/Topcit.jpg'] },
            { month: 'Jan', text: 'Advanced to the Top 12 final pitch at the Sinulog PropTech Hackathon, placed 2nd and won Collaborative Catalyst at the national PhilTech competition in BGC, Taguig, and won Best UI/UX at Sinulog PropTech.', media: ['/Philtech.jpg', '/SinulogFest.jpg'] },
        ],
    },
    {
        year: '2025',
        intro: 'The year I stopped being the beginner in the room. Podium finishes against other universities, a contract leading a real product, and elected leadership.',
        items: [
            { month: 'Dec', text: 'Joined the Sinulog PropTech Hackathon.' },
            { month: 'Oct', text: 'Team “Hanzilla and Friends” reached the Top 25 at CEB-i Hacks.' },
            { month: 'Sep', text: 'Competed in CEB-i Hacks (Mactan Airport) with team “Hanzilla and Friends,” and co-facilitated the CCSST Web Development Workshop Series.', media: ['/cebihacks_uspf.png'] },
            { month: 'Aug', text: 'Elected 4th-Year Representative among the USPF CCS officers (2025–2026).' },
            { month: 'May', text: 'Signed a contract as Technical Manager and Full-Stack Developer for the Buy@ndBuild startup.' },
            { month: 'Apr', text: 'Reached the Top 5 at the CESAFI Computer Quiz Bowl and placed 2nd at PropTech Filipino Homes — my first inter-university hackathon.', media: ['/Quizbowl.jfif', '/PropTech.jpg'] },
            { month: 'Mar', text: 'Placed 2nd at the USPF CCS Hackathon with a Figma prototype.', media: ['/2ndrunnerup2025.jpg', '/BestUIUX2025.jpg', '/Bestinprojectimplementation2025.jpg'] },
        ],
    },
    {
        year: '2024',
        intro: 'I stopped practicing and started shipping. My first real client turned into React and Node under deadline pressure — code that people actually depended on.',
        items: [
            { month: 'Dec', text: 'Received my NCII Computer Systems Servicing certificate — TESDA certified.', media: ['/NCII.jpg'] },
            { month: 'Oct', text: 'Was referred to a client to build a Shopify-related system.' },
            { month: 'Aug', text: 'Built a POS system for a client using React, Node.js, and MongoDB.' },
            { month: 'Jul', text: 'Joined the CCSST teambuilding at Junbel Mountain Resort, Carmen, Cebu — a College of Computer Studies Southern Technovators activity.', media: ['/MyStory/TeamBuilding.jpg'] },
            { month: 'Jun', text: 'Took NCII Computer Systems Servicing training under TESDA.' },
            { month: 'May', text: 'Re-elected Auditor of the USPF CCS Technovators with a majority vote.' },
            { month: 'Mar', text: 'Attended the PSITE 7 ICT Student Congress 2024 at Cebu Institute of Technology University.' },
            { month: 'Feb', text: 'Took on my first freelance client — a full-stack JavaScript startup build — and learned React and Node.js on the job.' },
        ],
    },
    {
        year: '2023',
        intro: 'Everything accelerated. First projects, first certificate, and my first hackathon at 2 a.m. fighting a bug that wouldn’t die — then a 2nd-place finish that told me I could really do this.',
        items: [
            { month: 'Dec', text: 'Placed 2nd (1st–3rd year category) in my first one-day department hackathon, and built and presented a solo e-commerce site (Bootstrap, PHP, SQL).', media: ['/MyStory/1st hackathon ccs.jpg', '/MyStory/1st hackathon ccs (2).jpg'] },
            { month: 'Sep', text: 'Named to the Dean’s List and facilitated a freshman class on C programming fundamentals.', media: ['/MyStory/Dean Lister 2nd.jpg', '/MyStory/MakeupClass.jpg', '/MyStory/MakeupClass (2).jpg'] },
            { month: 'Aug', text: 'Elected Auditor of the USPF CCS Technovators (SY 2023–2024).', media: ['/MyStory/Officer 2023.jpg'] },
            { month: 'Jul', text: 'Completed JavaScript 101 (8-hour training, MSTCONNECT) and earned a Certificate of Completion.', media: ['/MyStory/MST-JAvascript 101.pdf'] },
            { month: 'May', text: 'Built my first full-stack site from scratch — CRUD through a backend API plus login and registration — still one of my proudest early builds.' },
            { month: 'Apr', text: 'Built and presented my first web project, Artisano, using HTML, CSS, JavaScript, and Bootstrap; also attended the PSITE Central Visayas ICT Student Congress at Cebu Technological University.', media: ['/MyStory/Artisano.jpg', '/MyStory/PSITE 2023.jpg', '/MyStory/PSITE 2023 (2).jpg'] },
            { month: 'Mar', text: 'Named to the Dean’s List.', media: ['/MyStory/Deans Lister 2023.jpg'] },
        ],
    },
    {
        year: '2022',
        intro: 'The year I got serious. I transferred to USPF for Computer Science and finally learned what was happening under the hood — the fundamentals I’d been faking.',
        items: [
            { month: 'Aug', text: 'Transferred to the University of Southern Philippines Foundation (USPF) to pursue a BS in Computer Science.' },
            { month: 'Mar', text: 'Learned programming fundamentals and basic algorithms in C through a Udemy course.' },
        ],
    },
    {
        year: '2021',
        intro: 'Where it began — one blank HTML file, no idea what a function was, and enough stubbornness to Google my way to a working form. It wasn’t much, but it was mine, and it was enough to get me hooked.',
        items: [
            { month: 'Nov', text: 'Wrote my first “Hello, World” in HTML and CSS and, through self-research, built a working sign-up form (front-end only) — the start of it all.', media: ['/MyStory/First hello world output.png'] },
        ],
    },
];

const AboutPage = () => {
    const [tab, setTab] = useState(() =>
        new URLSearchParams(window.location.search).get('tab') === 'blog' ? 'blog' : 'story'
    );
    const [openYears, setOpenYears] = useState(() => new Set(['2026']));
    const [lightbox, setLightbox] = useState(null);

    // Close the image lightbox on Escape.
    useEffect(() => {
        if (!lightbox) return;
        const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightbox]);

    const toggleYear = (year) => {
        setOpenYears((prev) => {
            const next = new Set(prev);
            next.has(year) ? next.delete(year) : next.add(year);
            return next;
        });
    };

    return (
        <PageTransition>
            <SEO
                title="About - Lloyd C. Rosales"
                description="Lloyd C. Rosales is a full-stack software developer based in Cebu, Philippines, specializing in modern web applications, scalable systems, and AI-integrated products."
                path="/about"
            />
            <style>{`
                .tab-btn { position: relative; transition: color 0.2s; }
                .tab-underline { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: currentColor; border-radius: 2px; }

                .yr { border-top: 1px solid #e5e5e5; }
                .dark .yr { border-top-color: #1f1f1f; }
                .yr:last-child { border-bottom: 1px solid #e5e5e5; }
                .dark .yr:last-child { border-bottom-color: #1f1f1f; }
                .yr-btn {
                    width: 100%; display: flex; align-items: center; gap: 1rem;
                    padding: 1.25rem 0.25rem; cursor: pointer; text-align: left;
                    background: none; border: none;
                }
                .yr-chevron { transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); color: #a3a3a3; }
                .yr-chevron.open { transform: rotate(180deg); }

                .yr-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
                .yr-panel.open { grid-template-rows: 1fr; }
                .yr-panel-inner { overflow: hidden; }

                .tl { position: relative; padding-bottom: 1.5rem; }
                .tl::before {
                    content: ''; position: absolute; left: 5px; top: 4px; bottom: 1.9rem; width: 2px;
                    background: linear-gradient(to bottom, #d4d4d4, #d4d4d4 85%, transparent);
                }
                .dark .tl::before { background: linear-gradient(to bottom, #333, #333 85%, transparent); }
                .tl-node { position: relative; padding-left: 1.75rem; padding-bottom: 1.1rem; }
                .tl-node:last-child { padding-bottom: 0; }
                .tl-dot {
                    position: absolute; left: 0; top: 5px; width: 12px; height: 12px; border-radius: 9999px;
                    background: #fafafa; border: 2px solid #a3a3a3;
                }
                .dark .tl-dot { background: #0a0a0a; border-color: #555; }
                .tl-month {
                    display: inline-block; font-family: 'Geist Mono', ui-monospace, monospace;
                    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
                    color: #000; margin-right: 0.5rem;
                }
                .dark .tl-month { color: #fff; }
            `}</style>

            <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
                {/* ─── Page Hero ─── */}
                <section className="pt-28 pb-14 px-6 md:px-8 max-w-4xl mx-auto">
                    <m.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center text-center"
                    >
                        {/* Headshot */}
                        <m.div variants={itemVariants} className="mb-8">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/50">
                                {/* [PERF FIX 4] Image lazy loading and dimensions */}
                                <img
                                    src="/lloyd-pic.png"
                                    alt="Lloyd Rosales"
                                    width="400"
                                    height="400"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </m.div>

                        {/* Title */}
                        <m.div variants={itemVariants}>
                            <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs font-mono">
                                The Person Behind the Code
                            </span>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mt-3 text-black dark:text-white font-headline">
                                About Me
                            </h1>
                        </m.div>
                    </m.div>
                </section>

                {/* ─── Tabs ─── */}
                <div className="max-w-4xl mx-auto px-6 md:px-8">
                    <div
                        role="tablist"
                        aria-label="About sections"
                        className="flex items-center justify-center gap-8 border-b border-neutral-200 dark:border-neutral-800"
                    >
                        {[
                            { id: 'story', label: 'My Story' },
                            { id: 'blog', label: 'Blog' },
                        ].map(({ id, label }) => {
                            const active = tab === id;
                            return (
                                <button
                                    key={id}
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setTab(id)}
                                    className={`tab-btn font-mono text-sm font-bold uppercase tracking-widest pb-4 ${
                                        active ? 'text-black dark:text-white' : 'text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    {label}
                                    {active && <span className="tab-underline" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Tab: My Story ─── */}
                {tab === 'story' && (
                    <m.section
                        key="story"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="py-14 px-6 md:px-8 max-w-4xl mx-auto"
                    >
                        {/* Opening hook */}
                        <p className="font-serif italic text-xl md:text-2xl text-black dark:text-white leading-snug">
                            Every developer has an origin story. Mine starts with a blank HTML file and no idea what I was doing.
                        </p>
                        <p className="mt-5 text-neutral-600 dark:text-neutral-300 text-base md:text-lg leading-relaxed">
                            I&rsquo;m <span className="text-black dark:text-white font-semibold">Lloyd Rosales</span>, a full-stack software developer from Cebu, Philippines. What began as late-night curiosity in 2021 turned — through hackathons, real client deadlines, and a BS in Computer Science at USPF — into building production web apps, scalable systems, and AI-integrated products. I care as much about how software feels to use as how it&rsquo;s built. Here&rsquo;s how it happened, year by year.
                        </p>

                        {/* Core Focus */}
                        <div className="mt-12">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-mono">
                                Core Focus
                            </span>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {coreFocus.map(({ icon, label }) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-3"
                                    >
                                        <div className="w-8 h-8 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center flex-shrink-0">
                                            <Icon name={icon} className="text-black dark:text-white text-base" />
                                        </div>
                                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="mt-14">
                            <div className="flex items-baseline justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-mono">
                                    The Story, Year by Year
                                </span>
                                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">tap a year to read the chapter</span>
                            </div>

                            <div>
                                {timeline.map(({ year, intro, items }) => {
                                    const open = openYears.has(year);
                                    return (
                                        <div key={year} className="yr">
                                            <button
                                                className="yr-btn group"
                                                onClick={() => toggleYear(year)}
                                                aria-expanded={open}
                                            >
                                                <span className="text-2xl md:text-3xl font-black tracking-tight text-black dark:text-white font-headline tabular-nums">
                                                    {year}
                                                </span>
                                                <span className="flex-1 text-xs font-mono text-neutral-400 dark:text-neutral-500">
                                                    {items.length} milestone{items.length > 1 ? 's' : ''}
                                                </span>
                                                <Icon name="expand_more" className={`yr-chevron text-2xl ${open ? 'open' : ''}`} />
                                            </button>

                                            <div className={`yr-panel ${open ? 'open' : ''}`}>
                                                <div className="yr-panel-inner">
                                                    {intro && (
                                                        <p className="mb-6 font-serif italic text-[15px] md:text-base leading-relaxed text-neutral-700 dark:text-neutral-200 border-l-2 border-black/70 dark:border-white/70 pl-4">
                                                            {intro}
                                                        </p>
                                                    )}
                                                    <ol className="tl">
                                                        {items.map((it, i) => (
                                                            <li key={i} className="tl-node">
                                                                <span className="tl-dot" />
                                                                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                                                    <span className="tl-month">{it.month}</span>
                                                                    {it.text}
                                                                </p>
                                                                {it.media?.length > 0 && (
                                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                                        {it.media.map((src) => {
                                                                            const href = encodeURI(src);
                                                                            const isPdf = /\.pdf$/i.test(src);
                                                                            return isPdf ? (
                                                                                <a
                                                                                    key={src}
                                                                                    href={href}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 h-14 sm:h-16 text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 hover:border-black dark:hover:border-white transition-colors"
                                                                                >
                                                                                    <Icon name="integration_instructions" className="text-base" />
                                                                                    View PDF
                                                                                </a>
                                                                            ) : (
                                                                                <button
                                                                                    key={src}
                                                                                    type="button"
                                                                                    onClick={() => setLightbox(href)}
                                                                                    aria-label={`View photo — ${it.month} ${year}`}
                                                                                    className="block overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors cursor-zoom-in"
                                                                                >
                                                                                    <img
                                                                                        src={href}
                                                                                        alt={`${it.month} ${year}`}
                                                                                        loading="lazy"
                                                                                        decoding="async"
                                                                                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover"
                                                                                    />
                                                                                </button>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Beyond the Terminal */}
                        <div className="mt-14">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-mono">
                                Beyond the Terminal
                            </span>
                            <div className="mt-4 flex flex-wrap gap-2.5">
                                {hobbies.map(({ icon, label }) => (
                                    <span
                                        key={label}
                                        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300"
                                    >
                                        <Icon name={icon} className="text-black dark:text-white text-base" />
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </m.section>
                )}

                {/* ─── Tab: Blog ─── */}
                {tab === 'blog' && (
                    <m.section
                        key="blog"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="py-14 px-6 md:px-8 max-w-4xl mx-auto"
                    >
                        {blogPosts.length === 0 ? (
                            <div className="flex flex-col items-center text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 py-16 px-6">
                                <div className="w-14 h-14 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-6">
                                    <Icon name="draw" className="text-black dark:text-white text-2xl" />
                                </div>
                                <h2 className="text-2xl font-black tracking-tight text-black dark:text-white font-headline">
                                    Blog — Coming Soon
                                </h2>
                                <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
                                    I&rsquo;m putting together write-ups on the things I build — architecture decisions, hackathon retrospectives, and lessons from shipping AI-integrated products. Check back shortly.
                                </p>
                                <Link
                                    to="/projects"
                                    className="mt-8 inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white px-5 py-2.5 rounded-lg font-mono text-sm font-bold tracking-wide hover:border-black dark:hover:border-white transition-all duration-200"
                                >
                                    Explore Projects Meanwhile
                                    <Icon name="arrow_forward" className="text-base" />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {[...blogPosts]
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((post) => (
                                        <BlogCard key={post.title} post={post} />
                                    ))}
                                <div className="pt-2 text-center">
                                    <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                                        View all posts <Icon name="arrow_forward" className="text-sm" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </m.section>
                )}

                {/* ─── CTA ─── */}
                <ScrollReveal>
                    <section className="py-16 px-6 md:px-8 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-3xl font-black tracking-tight text-black dark:text-white font-headline mb-4">
                                Let&rsquo;s Build Something
                            </h2>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-lg mx-auto mb-8">
                                Whether you need a scalable system, a refined user experience, or an engineering partner who cares about craft — I&rsquo;m ready.
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <Link
                                    to="/projects"
                                    className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-wide hover:opacity-90 active:scale-95 transition-all duration-200"
                                >
                                    View Projects
                                    <Icon name="arrow_forward" className="text-base" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-wide hover:border-black dark:hover:border-white transition-all duration-200"
                                >
                                    Get in Touch
                                </Link>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                <SharedFooter />
            </div>

            {/* Image lightbox — click outside or press Esc to close */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
                    onClick={() => setLightbox(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo viewer"
                >
                    <button
                        type="button"
                        onClick={() => setLightbox(null)}
                        aria-label="Close"
                        className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-2xl leading-none"
                    >
                        &times;
                    </button>
                    <img
                        src={lightbox}
                        alt="Enlarged photo"
                        className="max-w-full max-h-[88vh] rounded-lg shadow-2xl object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </PageTransition>
    );
};

export default AboutPage;
