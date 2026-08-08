import { useEffect, useRef, useState } from 'react';
// [PERF FIX 5] Framer Motion LazyMotion optimization
import { m } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

/* ─── Kinetic Grid Background ─── */
const KineticGrid = ({ revealed }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const cols = 20;
        const rows = 14;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const draw = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            const cellW = w / cols;
            const cellH = h / rows;

            ctx.clearRect(0, 0, w, h);

            const isDark = document.documentElement.classList.contains('dark');
            const baseColor = isDark ? 'rgba(255,255,255,' : 'rgba(0,0,0,';

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const cx = c * cellW + cellW / 2;
                    const cy = r * cellH + cellH / 2;

                    const dx = mouseRef.current.x - cx;
                    const dy = mouseRef.current.y - cy;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    const maxDist = 250;
                    // Static, uniform grid when the user prefers reduced motion.
                    const influence = prefersReduced ? 0 : Math.max(0, 1 - dist / maxDist);

                    const baseOpacity = 0.04;
                    const opacity = baseOpacity + influence * 0.12;

                    ctx.strokeStyle = `${baseColor}${opacity})`;
                    ctx.lineWidth = 0.5;

                    const inset = 2 + influence * 4;
                    ctx.strokeRect(
                        c * cellW + inset,
                        r * cellH + inset,
                        cellW - inset * 2,
                        cellH - inset * 2
                    );

                    if (influence > 0.3) {
                        ctx.fillStyle = `${baseColor}${influence * 0.06})`;
                        ctx.fillRect(
                            c * cellW + inset,
                            r * cellH + inset,
                            cellW - inset * 2,
                            cellH - inset * 2
                        );
                    }
                }
            }

            // Only animate continuously when motion is allowed.
            if (!prefersReduced) {
                animFrameRef.current = requestAnimationFrame(draw);
            }
        };

        resize();
        draw();

        const handleResize = () => {
            resize();
            if (prefersReduced) draw();
        };
        window.addEventListener('resize', handleResize);

        const handleMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        if (!prefersReduced) {
            canvas.addEventListener('mousemove', handleMove);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMove);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <m.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={revealed ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full pointer-events-auto"
        />
    );
};

/* ─── Console Typing Animation ─── */
const useConsoleText = (words) => {
    const [displayText, setDisplayText] = useState('');
    const [fullText, setFullText] = useState(words[0]);
    const [cursorVisible, setCursorVisible] = useState(true);

    const wordsRef = useRef([...words]);
    const letterCount = useRef(1);
    const x = useRef(1);
    const waiting = useRef(false);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (letterCount.current === 0 && !waiting.current) {
                waiting.current = true;
                setDisplayText('');
                setTimeout(() => {
                    const usedWord = wordsRef.current.shift();
                    wordsRef.current.push(usedWord);
                    x.current = 1;
                    setFullText(wordsRef.current[0]);
                    letterCount.current += x.current;
                    waiting.current = false;
                }, 1000);
            } else if (letterCount.current === wordsRef.current[0].length + 1 && !waiting.current) {
                waiting.current = true;
                setTimeout(() => {
                    x.current = -1;
                    letterCount.current += x.current;
                    waiting.current = false;
                }, 1000);
            } else if (!waiting.current) {
                setDisplayText(wordsRef.current[0].substring(0, letterCount.current));
                letterCount.current += x.current;
            }
        }, 120);

        const cursorInterval = setInterval(() => {
            setCursorVisible(v => !v);
        }, 400);

        return () => {
            clearInterval(typingInterval);
            clearInterval(cursorInterval);
        };
    }, []);

    return { displayText, fullText, cursorVisible };
};

/* ─── Reveal Variants ─── */
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const Hero = ({ revealed }) => {
    const navigate = useNavigate();

    const { displayText, fullText, cursorVisible } = useConsoleText([
        'Software Developer',
        'BS in Computer Science',
        'Full-Stack Developer'
    ]);

    // Split text for highlight effect (last word gets accent)
    const lastSpaceIndex = fullText.lastIndexOf(' ');
    const highlightIndex = lastSpaceIndex !== -1 ? lastSpaceIndex + 1 : fullText.length;

    const baseText = displayText.substring(0, highlightIndex);
    const highlightedText = displayText.substring(highlightIndex);

    const isTypingHighlight = displayText.length >= highlightIndex && highlightIndex !== fullText.length;

    return (
        <PageTransition>
            <header
                className="min-h-screen lg:min-h-[80vh] flex items-center justify-center px-6 md:px-8 max-w-5xl mx-auto pt-28 pb-16 lg:pt-24 lg:pb-16 relative"
                id="home">
                {/* Kinetic Grid Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <KineticGrid revealed={revealed} />
                </div>

                <m.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={revealed ? "visible" : "hidden"}
                    className="w-full relative z-10 grid lg:grid-cols-5 items-center gap-10 lg:gap-14"
                >
                    {/* LEFT — intro */}
                    <m.div variants={itemVariants} className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        {/* Availability pill — leads with the hiring signal */}
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-white/5 backdrop-blur-sm px-3.5 py-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                                Available for work · Cebu, PH
                            </span>
                        </div>

                        <div className="flex flex-col items-center lg:items-start">
                            {/* Single stable, indexable heading for SEO + screen readers. */}
                            <h1 className="sr-only">Lloyd Rosales — Software Developer &amp; Full-Stack Developer</h1>

                            {/* Decorative visual heading — hidden from assistive tech. */}
                            <div aria-hidden="true" className="flex flex-col items-center lg:items-start">
                                {/* Static Greeting */}
                                <p className="font-headline text-3xl sm:text-4xl md:text-5xl font-semibold text-black dark:text-white mb-2 tracking-wide">
                                    Hello, I'm <span className="font-serif italic text-neutral-500 dark:text-neutral-400">Lloyd.</span>
                                </p>

                                {/* Animated cycling text */}
                                <div className="font-headline italic text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-center lg:text-left min-h-[2.5em] md:min-h-[1.5em] leading-tight">
                                    <span className="drop-shadow-sm whitespace-pre-wrap">
                                        <span className="text-black dark:text-white transition-colors duration-300">{baseText}</span>
                                        <span className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300">{highlightedText}</span>
                                    </span>

                                    {/* Blinking cursor */}
                                    <span
                                        className={`inline-block w-[4px] rounded-sm ml-1 align-middle transition-colors duration-300 ${isTypingHighlight ? 'bg-neutral-500 dark:bg-neutral-400' : 'bg-black dark:bg-white'}`}
                                        style={{
                                            height: '0.85em',
                                            opacity: cursorVisible ? 1 : 0
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Value proposition — what I actually build */}
                        <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                            I build modern web apps, scalable systems, and <span className="text-black dark:text-white font-semibold">AI-integrated products</span> — from first prototype to production.
                        </p>

                        {/* Proof stats */}
                        <div className="flex items-stretch justify-center lg:justify-start divide-x divide-neutral-200 dark:divide-neutral-800 pt-2">
                            {[
                                { value: '15+', label: 'Projects Shipped' },
                                { value: 'Full-Stack', label: 'Web · Mobile' },
                                { value: 'AI / ML', label: 'Integrated' },
                            ].map((stat, i) => (
                                <div key={stat.label} className={`flex flex-col items-center lg:items-start ${i === 0 ? 'pr-5 sm:pr-7' : 'px-5 sm:px-7'}`}>
                                    <span className="font-headline text-lg sm:text-2xl font-black tracking-tight text-black dark:text-white">
                                        {stat.value}
                                    </span>
                                    <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600 mt-1">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons — primary action is the work */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4 w-full sm:w-auto">
                            <button
                                onClick={() => navigate('/projects')}
                                className="group inline-flex items-center justify-center gap-2.5 bg-black dark:bg-white text-white dark:text-black px-7 py-3.5 rounded-lg font-mono text-sm font-bold uppercase tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                            >
                                View Work
                                <Icon name="arrow_forward" className="text-base transition-transform duration-200 group-hover:translate-x-1" />
                            </button>
                            <button
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = '/Resume-LloydRosales.pdf';
                                    link.download = 'rosales_resume.pdf';
                                    link.click();
                                }}
                                className="group inline-flex items-center justify-center gap-2.5 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white px-7 py-3.5 rounded-lg font-mono text-sm font-bold uppercase tracking-wide hover:border-black dark:hover:border-white active:scale-[0.98] transition-all duration-200"
                            >
                                <Icon name="download" className="text-base transition-transform duration-200 group-hover:translate-y-0.5" />
                                Download Resume
                            </button>
                        </div>

                        {/* Quiet tertiary link */}
                        <button
                            onClick={() => navigate('/contact')}
                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            Open to opportunities — get in touch
                            <Icon name="arrow_forward" className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                    </m.div>

                    {/* RIGHT — headshot */}
                    <m.div variants={itemVariants} className="lg:col-span-2 order-first lg:order-none flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Offset accent frame for editorial depth */}
                            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-neutral-300 dark:border-neutral-700" />
                            <div className="relative w-44 sm:w-56 lg:w-full lg:max-w-[20rem] aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-2xl dark:shadow-black/50">
                                <img
                                    src="/lloyd-pic.png"
                                    alt="Lloyd Rosales, software developer"
                                    width="512"
                                    height="640"
                                    decoding="async"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            {/* Floating monogram tag */}
                            <div className="absolute -bottom-3 -left-3 flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black rounded-lg px-3 py-2 shadow-lg">
                                <Icon name="code" className="text-base" />
                                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Full-Stack · AI</span>
                            </div>
                        </div>
                    </m.div>
                </m.div>

                {/* Scroll cue */}
                <m.button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    initial={{ opacity: 0 }}
                    animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    aria-label="Scroll to work"
                    className="hidden md:flex absolute bottom-2 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-neutral-400 dark:text-neutral-600 hover:text-black dark:hover:text-white transition-colors"
                >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
                    <Icon name="expand_more" className="text-lg motion-safe:animate-bounce" />
                </m.button>
            </header>
        </PageTransition>
    );
};

export default Hero;
