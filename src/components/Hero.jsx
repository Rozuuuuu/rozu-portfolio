import { useEffect, useRef, useState } from 'react';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import SocialCards from './SocialCards';
import { useNavigate } from 'react-router-dom';

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

const Hero = () => {
    const navigate = useNavigate();

    const { displayText, fullText, cursorVisible } = useConsoleText([
        'Software Developer',
        'BS in Computer Science',
        'Full-Stack Developer',
        'AI Engineer'
    ]);

    // Find the starting index for the red highlight (the word after the last space)
    const lastSpaceIndex = fullText.lastIndexOf(' ');
    const highlightIndex = lastSpaceIndex !== -1 ? lastSpaceIndex + 1 : fullText.length;

    // Split the currently rendered text into base (white/black) and highlighted (red) sets
    const baseText = displayText.substring(0, highlightIndex);
    const highlightedText = displayText.substring(highlightIndex);

    // If we've started typing the red text, the cursor should be red too.
    const isTypingHighlight = displayText.length >= highlightIndex && highlightIndex !== fullText.length;

    return (
        <PageTransition>
            <header
                className="min-h-[80vh] flex items-center justify-center px-6 md:px-8 max-w-7xl mx-auto overflow-hidden"
                id="home"
            >
                <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    <ScrollReveal className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container font-label text-xs uppercase tracking-widest font-bold">
                            Rozu's Portfolio
                        </div>

                        <div className="flex flex-col items-center lg:items-start">
                            {/* Static Greeting */}
                            <h2 className="font-['Epilogue'] text-3xl sm:text-4xl md:text-5xl italic font-semibold text-stone-900 dark:text-white mb-2 tracking-wide">
                                Hello I'm <span className="text-primary dark:text-red-500">Lloyd.</span>
                            </h2>

                            {/* Animated cycling text */}
                            <h1 className="font-['Epilogue'] italic text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter flex items-center justify-center lg:justify-start min-h-[2.5em] md:min-h-[1.5em] max-w-4xl leading-tight">
                                <span className="drop-shadow-sm whitespace-pre">
                                    <span className="text-stone-900 dark:text-white transition-colors duration-300">{baseText}</span>
                                    <span className="text-primary dark:text-red-500 transition-colors duration-300">{highlightedText}</span>
                                </span>
                                
                                {/* Blinking cursor */}
                                <span
                                    className={`inline-block w-[4px] rounded-sm ml-1 align-middle transition-colors duration-300 ${isTypingHighlight ? 'bg-primary dark:bg-red-500' : 'bg-stone-900 dark:bg-white'}`}
                                    style={{
                                        height: '0.85em',
                                        opacity: cursorVisible ? 1 : 0
                                    }}
                                />
                            </h1>
                        </div>

                        {/* Subtle subtitle */}
                        <p className="text-sm text-on-surface-variant dark:text-stone-500 tracking-[0.25em] uppercase font-medium pt-2">
                            Cebu City, Philippines &nbsp;·&nbsp; Open to Work
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex gap-4 flex-wrap justify-center lg:justify-start pt-4">
                            <button
                                onClick={() => navigate('/projects')}
                                className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                            >
                                Explore Projects
                            </button>
                            <button
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = '/Resume-LloydRosales.pdf';
                                    link.download = 'rosales_resume.pdf';
                                    link.click();
                                }}
                                className="bg-surface-container-high dark:bg-stone-800 text-primary dark:text-stone-200 px-8 py-4 rounded-lg font-bold hover:bg-surface-container-highest dark:hover:bg-stone-700 transition-colors"
                            >
                                Download Resume
                            </button>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal className="hidden md:flex justify-center flex-shrink-0 w-full lg:w-auto relative lg:mr-8 xl:mr-16">
                        <SocialCards />
                    </ScrollReveal>
                </div>
            </header>
        </PageTransition>
    );
};

export default Hero;
