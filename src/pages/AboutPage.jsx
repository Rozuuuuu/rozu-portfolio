import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { SharedFooter } from '../components/SharedFooter';

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

/* ─── Hobbies Data ─── */
const hobbies = [
    {
        icon: 'draw',
        label: 'Drawing',
        desc: 'Sketching ideas into visuals — from UI wireframes to freehand art.',
    },
    {
        icon: 'fitness_center',
        label: 'Fitness & Gym',
        desc: 'Discipline in the gym translates to discipline in the codebase.',
    },
    {
        icon: 'directions_run',
        label: 'Jogging',
        desc: 'Clearing the mind, one stride at a time. The best debugging happens outdoors.',
    },
    {
        icon: 'casino',
        label: 'Board Game Club',
        desc: 'Strategy and pattern recognition — skills that transfer directly to system design.',
    },
    {
        icon: 'sports_volleyball',
        label: 'Volleyball',
        desc: 'Teamwork, communication, and split-second decisions under pressure.',
    },
    {
        icon: 'sports_basketball',
        label: 'Basketball',
        desc: 'Fast-paced coordination and competitive drive on and off the court.',
    },
];

const AboutPage = () => {
    return (
        <PageTransition>
            <SEO 
                title="About - Lloyd C. Rosales" 
                description="Learn more about Lloyd Rosales, a software engineer passionate about creating intuitive user experiences and robust architectures." 
                path="/about" 
            />
            <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-300">
                {/* ─── Page Hero ─── */}
                <section className="pt-28 pb-20 px-6 md:px-8 max-w-4xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center text-center"
                    >
                        {/* Headshot */}
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/50">
                                <img
                                    src="/lloyd-pic.png"
                                    alt="Lloyd Rosales"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.div variants={itemVariants}>
                            <span className="text-black dark:text-white font-bold tracking-[0.3em] uppercase text-xs font-mono">
                                The Person Behind the Code
                            </span>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mt-3 text-black dark:text-white font-headline">
                                About Me
                            </h1>
                        </motion.div>

                        {/* Intro */}
                        <motion.p 
                            variants={itemVariants}
                            className="mt-6 text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-2xl"
                        >
                            Not just a developer — an engineer who believes great software sits at the intersection of architectural rigor and human empathy.
                        </motion.p>
                    </motion.div>
                </section>

                {/* ─── Early Engineering ─── */}
                <ScrollReveal>
                    <section className="py-20 px-6 md:px-8 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="max-w-4xl mx-auto grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-mono">
                                    01 — Origins
                                </span>
                                <h2 className="text-2xl font-black tracking-tight mt-2 text-black dark:text-white font-headline">
                                    Early Engineering
                                </h2>
                            </div>
                            <div className="space-y-6">
                                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
                                    My journey began with a curiosity for how complex systems interact. This evolved into a passion for building software that isn't just functional, but architecturally sound and scalable.
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm">
                                    From tinkering with simple scripts to architecting full-stack applications serving real users — every project taught me that the best code is the code you don't have to explain. It speaks for itself through clarity, intent, and structure.
                                </p>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* ─── Professional Philosophy ─── */}
                <ScrollReveal>
                    <section className="py-20 px-6 md:px-8 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                        <div className="max-w-4xl mx-auto grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-mono">
                                    02 — Philosophy
                                </span>
                                <h2 className="text-2xl font-black tracking-tight mt-2 text-black dark:text-white font-headline">
                                    How I Build
                                </h2>
                            </div>
                            <div className="space-y-6">
                                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
                                    I champion "clean code" and user-centric systems. I believe that engineering maturity is defined by how we handle trade-offs and operational awareness, not just the features we ship.
                                </p>
                                <div className="border-l-2 border-black dark:border-white pl-6 py-2">
                                    <p className="text-black dark:text-white font-medium italic text-base leading-relaxed">
                                        "Performance is the baseline. Soul is the differentiator."
                                    </p>
                                </div>
                                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm">
                                    Every system I touch is measured by three pillars: resilience under load, developer experience for the next engineer, and the end-user's emotional response to the interface. If any one of those fails, the system is incomplete.
                                </p>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* ─── Offline Impact ─── */}
                <ScrollReveal>
                    <section className="py-20 px-6 md:px-8 border-t border-neutral-200 dark:border-neutral-800" id="offline">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-12">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-mono">
                                    03 — Offline
                                </span>
                                <h2 className="text-2xl font-black tracking-tight mt-2 text-black dark:text-white font-headline">
                                    Beyond the Terminal
                                </h2>
                                <p className="text-neutral-500 dark:text-neutral-400 mt-4 max-w-xl text-sm leading-relaxed">
                                    Engineering is what I do. These are the things that make me who I am.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {hobbies.map((hobby, index) => (
                                    <motion.div
                                        key={hobby.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.08,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }}
                                        className="group relative"
                                    >
                                        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 h-full transition-all duration-300 hover:border-black dark:hover:border-white hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5">
                                            {/* Icon */}
                                            <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4 group-hover:bg-black group-hover:dark:bg-white transition-colors duration-300">
                                                <span className="material-symbols-outlined text-black dark:text-white text-base group-hover:text-white group-hover:dark:text-black transition-colors duration-300">
                                                    {hobby.icon}
                                                </span>
                                            </div>

                                            {/* Label */}
                                            <h3 className="font-headline text-sm font-bold tracking-tight text-black dark:text-white mb-2">
                                                {hobby.label}
                                            </h3>

                                            {/* Desc */}
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                                {hobby.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* ─── CTA ─── */}
                <ScrollReveal>
                    <section className="py-20 px-6 md:px-8 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black dark:text-white font-headline mb-4">
                                Let's Build Something
                            </h2>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-lg mx-auto mb-8">
                                Whether you need a scalable system, a refined user experience, or an engineering partner who cares about craft — I'm ready.
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <Link
                                    to="/projects"
                                    className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-wide hover:opacity-90 active:scale-95 transition-all duration-200"
                                >
                                    View Projects
                                    <span className="material-symbols-outlined text-base">arrow_forward</span>
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
        </PageTransition>
    );
};

export default AboutPage;
