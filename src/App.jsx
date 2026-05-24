import { Suspense, lazy, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { DarkModeProvider } from './context/DarkModeContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import ChatSidebar from './components/ChatSidebar';
import BurgerMenuOverlay from './components/BurgerMenuOverlay';
import Footer from './components/Footer';
import LogoPreloader from './components/LogoPreloader';
import { HeroSkeleton, FeaturedProjectsSkeleton, TechnicalImpactSkeleton } from './components/Skeleton';
import SEO from './components/SEO';
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from './components/ScrollToTop';

// Eagerly loaded components for initial render (above-the-fold)
import Hero from './components/Hero';
import Objectives from './components/Objectives';

// Lazy loaded components for below-the-fold and subpages
const TechnicalImpact = lazy(() => import('./components/TechnicalImpact'));
const Experience = lazy(() => import('./components/Experience'));
const TechnicalArsenal = lazy(() => import('./components/TechnicalArsenal'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const ConnectWithMe = lazy(() => import('./components/ConnectWithMe'));

const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Content-aware fallback for below-the-fold sections
const BelowFoldSkeleton = () => (
    <div className="bg-white dark:bg-black">
        <TechnicalImpactSkeleton />
        <FeaturedProjectsSkeleton />
    </div>
);

// A fallback UI for Suspense on subpages
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[50vh] bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-neutral-300 dark:border-neutral-700 border-t-black dark:border-t-white rounded-full animate-spin"></div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Loading</span>
        </div>
    </div>
);

function HomePage({ revealed }) {
    return (
        <div style={{ overflow: 'clip' }}>
            <SEO 
                title="Lloyd C. Rosales | Software Engineer" 
                description="Lloyd Rosales is a full-stack software engineer specializing in modern web applications, scalable systems, and cross-platform mobile apps." 
                path="/" 
            />
            {/* Hero and Objectives are eagerly loaded for fast LCP */}
            <Hero revealed={revealed} />
            <Objectives />
            
            {/* Below the fold content is lazy loaded with content-aware skeletons */}
            <Suspense fallback={<BelowFoldSkeleton />}>
                <TechnicalImpact />
                <TechnicalArsenal />
                <Experience />
                <Projects />
                <Achievements />
                <ConnectWithMe />
            </Suspense>
            <Footer />
        </div>
    );
}

function AnimatedRoutes({ preloaderDone }) {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-black"><PageLoader /></div>}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage revealed={preloaderDone} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="/achievements" element={<AchievementsPage />} />
                    <Route path="/skills" element={<SkillsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
}

function App() {
    const [preloaderDone, setPreloaderDone] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), []);

    return (
        <HelmetProvider>
            <DarkModeProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    {/* Logo Preloader — only on initial mount */}
                    {!preloaderDone && <LogoPreloader onComplete={handlePreloaderComplete} />}
                    
                    <Navbar revealed={preloaderDone} />
                    <BottomNav 
                        revealed={preloaderDone} 
                        onOpenMenu={() => setMenuOpen(true)}
                        onOpenChat={() => setChatOpen(true)}
                    />
                    <ChatSidebar isOpen={chatOpen} onClose={() => setChatOpen(false)} />
                    <BurgerMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

                    <AnimatedRoutes preloaderDone={preloaderDone} />
                    <Analytics />
                </BrowserRouter>
            </DarkModeProvider>
        </HelmetProvider>
    );
}

export default App;
