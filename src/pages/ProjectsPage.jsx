import SharedNav from '../components/SharedNav';
import { SharedFooter } from '../components/SharedFooter';
import PageTransition from '../components/PageTransition';

/* ─── Tag Pill ─── */
const Tag = ({ children }) => (
    <span className="px-4 py-1 bg-red-50 dark:bg-stone-700 border border-red-200 dark:border-stone-600 rounded-full text-[10px] font-bold text-primary dark:text-red-400 uppercase tracking-wider">
        {children}
    </span>
);

/* ─── Card 1: Featured Wide ─── */
const ProjectCard1 = () => (
    <div className="md:col-span-8 group">
        <div className="relative overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800 aspect-[16/9] mb-6 shadow-md dark:shadow-black/40">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBidNJZdCrwyGclUfeA6Bf10YlCqXfYgCaR4mL6wH5BDtWxxluQv_Iw8K6xK02C_V9tw88fQDsNJNdTT-oKnV5rKR1DVgzK_UNHOBSplChIz0mPZd4bS4y6_5itXtUAY3CYs1ikkvfto46-QkptMjlIU21iwlEKupersLeyYRIFInS6WUlKgb4pifyy2nti8vUCYk8vTCKHaNk5Tk-5Y70CpDNMICS47ysvJzZ7PCj4GoX_jX0kDC65aCeGQOACdz9K3GoPrz0WfW6L"
                alt="Velocity Dashboard" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
            <Tag>React</Tag><Tag>Three.js</Tag><Tag>Tailwind CSS</Tag>
        </div>
        <h3 className="text-4xl font-black tracking-tighter mb-4 text-stone-900 dark:text-stone-50">VELOCITY DASHBOARD</h3>
        <p className="text-stone-600 dark:text-stone-300 max-w-xl mb-6 leading-relaxed">
            A high-fidelity performance tracking system for extreme sports enthusiasts. Built with real-time WebGL visualizations and low-latency data streams.
        </p>
        <div className="flex gap-8 items-center">
            <a className="text-primary dark:text-red-400 font-black text-xs uppercase tracking-widest border-b-2 border-primary dark:border-red-400 pb-1 group-hover:translate-x-2 transition-transform" href="#">Live Demo</a>
            <a className="text-stone-500 dark:text-stone-400 font-black text-xs uppercase tracking-widest hover:text-primary dark:hover:text-red-400 transition-colors" href="#">GitHub Repository</a>
        </div>
    </div>
);

/* ─── Card 2: Square ─── */
const ProjectCard2 = () => (
    <div className="md:col-span-4 flex flex-col justify-between group">
        <div>
            <div className="relative overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800 aspect-square mb-6 shadow-md dark:shadow-black/40">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA26ALWy-OSvX7rKhG1xKqdqW0wxPKPMRGY9GpR8h7IclqdJBRiDaHP7XdDtr-lctepcffj-1xdiCy9cFab5YNq7pO37ol9-NzxiGaUznanIad4X-jmhNFre5HsK9q19B1_IcN3wszTdqxMK3gRTa3HGmem9vk4Sd3EYNNqR-ub1Q-hVtOOhcKos_waeOWXqLgBzQC19WrHzPDTLl504XZv3DftlXF14AkQpIhyv7_tCX-GJPPr7cghMREvW5ViQvToSHkdkS6GFY4i"
                    alt="Chronos API" />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                <Tag>Laravel</Tag><Tag>PostgreSQL</Tag>
            </div>
            <h3 className="text-3xl font-black tracking-tighter mb-4 text-stone-900 dark:text-stone-50">CHRONOS API</h3>
            <p className="text-stone-600 dark:text-stone-300 mb-6 text-sm leading-relaxed">
                Robust enterprise-level scheduling engine optimized for distributed systems. Handling 1M+ requests daily with 99.9% uptime.
            </p>
        </div>
        <div className="flex gap-6 items-center">
            <a className="text-primary dark:text-red-400 font-black text-[10px] uppercase tracking-widest border-b-2 border-primary dark:border-red-400 pb-1" href="#">Documentation</a>
            <a className="text-stone-500 dark:text-stone-400 font-black text-[10px] uppercase tracking-widest hover:text-primary dark:hover:text-red-400 transition-colors" href="#">GitHub</a>
        </div>
    </div>
);

/* ─── Card 3: Wide horizontal ─── */
const ProjectCard3 = () => (
    <div className="md:col-span-10 group">
        <div className="bg-stone-100 dark:bg-stone-800 p-8 rounded-xl shadow-md dark:shadow-black/40 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="flex flex-wrap gap-2 mb-6">
                    <Tag>Node.js</Tag><Tag>Redis</Tag><Tag>WebSockets</Tag>
                </div>
                <h3 className="text-4xl font-black tracking-tighter mb-6 text-stone-900 dark:text-stone-50">SYNAPSE MESSENGER</h3>
                <p className="text-stone-600 dark:text-stone-300 mb-8 leading-relaxed">
                    A zero-knowledge encrypted messaging platform built for secure communication. Featuring real-time status syncing and end-to-end media sharing protocols.
                </p>
                <div className="flex gap-8">
                    <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">View Project</button>
                    <a className="flex items-center gap-2 text-stone-700 dark:text-stone-300 font-bold text-xs uppercase tracking-widest hover:text-primary dark:hover:text-red-400 transition-colors" href="#">
                        <span className="material-symbols-outlined text-sm">code</span> Codebase
                    </a>
                </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-xl aspect-video shadow-md dark:shadow-black/40">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkHqrV81GxPifYlmTgj0BVGmGDSajPaOvtGKeiknBcqgVmRG_lFeP4DoGIakLnah_NAikHYCzJIOjOf2Kopr59L8nM7Jy3XOzZomv86kOeCHbNJm0xMgibKBaWU-J1OoMSAs_yOpQXerMPIYObaXoFz-uTh86pwW296Dp5lZSI8_NXnnFLr761yDo5md60V8fPg5AAZ8kb5ODm0NbfYnACNM3o8NtU8gpY_i2T_2ufMylQvBqlFJs2Ou_ZDYfxxtA9PG631kP-6zgo"
                        alt="Synapse Messenger" />
                </div>
            </div>
        </div>
    </div>
);

/* ─── Card 4 & 5 shared template ─── */
const StandardCard = ({ img, alt, tags, title, desc, linkLabel }) => (
    <div className="md:col-span-6 group">
        <div className="relative overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800 aspect-video mb-6 shadow-md dark:shadow-black/40">
            <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={img} alt={alt} />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
        <h3 className="text-2xl font-black tracking-tighter mb-4 text-stone-900 dark:text-stone-50 uppercase">{title}</h3>
        <p className="text-stone-600 dark:text-stone-300 mb-6 text-sm leading-relaxed">{desc}</p>
        <a className="inline-flex items-center gap-2 text-primary dark:text-red-400 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all" href="#">
            {linkLabel} <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
    </div>
);

/* ─── Projects Page ─── */
const ProjectsPage = () => (
    <PageTransition>
        <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-300">
            <SharedNav />

            <main className="pt-32 pb-24">
                {/* Hero */}
                <header className="max-w-7xl mx-auto px-6 md:px-8 mb-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            <span className="inline-block py-1 px-3 mb-4 rounded-full bg-blue-900/80 text-blue-100 dark:bg-blue-800 dark:text-blue-100 text-xs font-bold uppercase tracking-widest">Selected Works</span>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
                                CREATIVE <br />
                                <span className="text-primary dark:text-red-400 italic">SOLUTIONS.</span>
                            </h1>
                            <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
                                A curated collection of digital experiences focusing on interaction, high-performance architecture, and editorial-grade visual design.
                            </p>
                        </div>
                        <div className="hidden lg:flex gap-4 items-center text-primary dark:text-red-400 font-bold text-sm pb-4">
                            <span className="material-symbols-outlined">expand_more</span>
                            <span className="uppercase tracking-widest">Scroll to explore</span>
                        </div>
                    </div>
                </header>

                {/* Grid */}
                <section className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <ProjectCard1 />
                        <ProjectCard2 />
                        <div className="hidden md:block md:col-span-2"></div>
                        <ProjectCard3 />
                        <StandardCard
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuCHzm4o4YPI3--dRsEueHejaP5Qr5drtruCJbBP7_1ggS74nZZID1ATEUJdfMF1vkoyfPoDHRwjIXTwKUwcU0A9RWjEszZsjzDPB27yDtRrnJ831i_1vR4MfdHyRsnzYDmtsii7B6WPtL8nmCTSzU77nCc-Ezzn3i3UK7nIpVJQvgQ48sS3YlyeSoQMSuXIaOrLARqmg2ZfzbLJLTlsYf4JpO1oLxshOEdDocBZuKqgnKhgG1X9-AutO-IUc85ic1N50mznKt1asu38"
                            alt="The Editorial Archive" tags={['Next.js', 'Contentful']}
                            title="The Editorial Archive"
                            desc="A headless CMS implementation for a global design magazine. Optimized for SEO and lightning-fast content delivery through Vercel Edge."
                            linkLabel="Live Site"
                        />
                        <StandardCard
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuDe3LFpxPA3nSEyMw4b-wqbWJrzn2ShOmadPaAncPsWbKvUwxM9IGu955--2EGnzRjtASNQ6ZDHB3qw5FmUIWrrtnzT8-j5rnHG0ndfyYpgSrb6BkCy0ziy3zeEM1qtuft5hyLu8g8rACxAbchvjKVvy4_ypdb-z9USUmsAjlwNRCo4TofGKVz0HfNhYGOjrsjjh0Y8CRjHmJ1Gv-fy9zX1jMZGhEbmnXAFJKKfzlG8F8odukEiEeORhwJ2p8z7HDGz74Gf6Xk65FXM"
                            alt="Aura Vision AI" tags={['Python', 'TensorFlow']}
                            title="AURA VISION AI"
                            desc="Computer vision model capable of real-time sentiment analysis and spatial awareness for retail environments."
                            linkLabel="GitHub"
                        />
                    </div>
                </section>

                {/* CTA */}
                <section className="max-w-7xl mx-auto px-6 md:px-8 mt-32">
                    <div className="bg-primary p-12 md:p-24 rounded-xl text-center relative overflow-hidden shadow-2xl shadow-primary/30">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="material-symbols-outlined text-[12rem] text-white">auto_awesome</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 relative z-10">HAVE A PROJECT <br /> IN MIND?</h2>
                        <p className="text-white/80 text-lg max-w-xl mx-auto mb-12 relative z-10">
                            I'm currently available for freelance projects and full-time collaborative roles in design-led engineering teams.
                        </p>
                        <button className="bg-white text-primary px-12 py-5 rounded-lg font-black uppercase tracking-widest text-sm hover:bg-stone-100 transition-colors relative z-10 shadow-2xl">
                            Let's Connect
                        </button>
                    </div>
                </section>
            </main>

            <SharedFooter />
        </div>
    </PageTransition>
);

export default ProjectsPage;
