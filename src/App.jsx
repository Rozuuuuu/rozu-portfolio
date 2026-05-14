import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DarkModeProvider } from './context/DarkModeContext';
import SharedNav from './components/SharedNav';
import Footer from './components/Footer';

// Eagerly loaded components for initial render (above-the-fold)
import Hero from './components/Hero';
import TechnicalArsenal from './components/TechnicalArsenal';

// Lazy loaded components for below-the-fold and subpages
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const TechnicalImpact = lazy(() => import('./components/TechnicalImpact'));
const ConnectWithMe = lazy(() => import('./components/ConnectWithMe'));
const Achievements = lazy(() => import('./components/Achievements'));

const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// A fallback UI for Suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
  </div>
);

function HomePage() {
  return (
    <div style={{ overflow: 'clip' }}>
      <SharedNav />
      {/* Hero and TechnicalArsenal are eagerly loaded for fast LCP */}
      <Hero />
      <TechnicalArsenal />
      
      {/* Below the fold content is lazy loaded */}
      <Suspense fallback={<PageLoader />}>
        <Projects />
        <Experience />
        <TechnicalImpact />
        <Achievements />
        <ConnectWithMe />
      </Suspense>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-stone-950"><PageLoader /></div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
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
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
