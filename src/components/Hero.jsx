import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useNavigate } from 'react-router-dom';

/* ─── Kinetic Grid Background ─── */
const KineticGrid = ({ revealed }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        const cols = 20;
        const rows = 14;

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
                    const influence = Math.max(0, 1 - dist / maxDist);

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

            animFrameRef.current = requestAnimationFrame(draw);
        };

        draw();

        const handleMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        canvas.addEventListener('mousemove', handleMove);

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMove);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <motion.canvas
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
                className="min-h-screen lg:min-h-[80vh] flex items-center justify-center px-6 md:px-8 max-w-7xl mx-auto pt-32 pb-16 lg:pt-0 lg:pb-0 relative"
                id="home"
            >
                {/* Kinetic Grid Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <KineticGrid revealed={revealed} />
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate={revealed ? "visible" : "hidden"}
                    className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-10"
                >
                    <motion.div variants={itemVariants} className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        <div className="flex flex-col items-center lg:items-start">
                            {/* Static Greeting */}
                            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl italic font-semibold text-black dark:text-white mb-2 tracking-wide">
                                Hello I'm <span className="text-neutral-500 dark:text-neutral-400">Lloyd.</span>
                            </h2>

                            {/* Animated cycling text */}
                            <h1 className="font-headline italic text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-center lg:text-left min-h-[2.5em] md:min-h-[1.5em] max-w-4xl leading-tight">
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
                            </h1>
                        </div>

                        {/* Mobile Photo Image (Visible only on mobile/tablet) */}
                        <div className="lg:hidden w-full flex justify-center py-4 relative group">
                            <div className="aspect-square w-64 md:w-80 rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/50 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)]">
                                <img
                                    className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700"
                                    src="/lloyd-pic.png"
                                    alt="Lloyd Rosales"
                                />
                            </div>
                            <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:left-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 rounded-xl shadow-xl max-w-[200px] sm:max-w-[240px] z-10 text-left">
                                <p className="font-label text-[10px] sm:text-xs font-bold uppercase text-black dark:text-white tracking-widest mb-2">Philosophy</p>
                                <p className="font-body text-xs sm:text-sm font-medium italic text-neutral-600 dark:text-neutral-300 leading-snug">
                                    "Performance is the baseline. Soul is the differentiator."
                                </p>
                            </div>
                        </div>

                        {/* Subtle subtitle */}
                        <p className="text-sm text-neutral-500 dark:text-neutral-500 tracking-[0.25em] uppercase font-medium pt-2">
                            Cebu City, Philippines &nbsp;·&nbsp; Open to Work
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex gap-4 flex-wrap justify-center lg:justify-start pt-4">
                            <button
                                className="dl-btn"
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = '/Resume-LloydRosales.pdf';
                                    link.download = 'rosales_resume.pdf';
                                    link.click();
                                }}
                            >
                                <span className="dl-btn_lg">
                                    <span className="dl-btn_sl" />
                                    <span className="dl-btn_text">Download Resume</span>
                                </span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Desktop Profile Photo (Hidden on mobile) */}
                    <motion.div variants={itemVariants} className="hidden lg:flex justify-center flex-shrink-0 relative mr-8 xl:mr-16 z-10">
                        <div className="relative group">
                            <div className="aspect-square w-80 rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/50 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)]">
                                <img
                                    className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700"
                                    src="/lloyd-pic.png"
                                    alt="Lloyd Rosales"
                                />
                            </div>
                            {/* Philosophical Quote */}
                            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-xl max-w-[240px] z-10">
                                <p className="font-label text-xs font-bold uppercase text-black dark:text-white tracking-widest mb-2">Philosophy</p>
                                <p className="font-body text-sm font-medium italic text-neutral-600 dark:text-neutral-300 leading-snug">
                                    "Performance is the baseline. Soul is the differentiator."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </header>
        </PageTransition>
    );
};

export default Hero;
