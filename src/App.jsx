import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DarkModeProvider } from './context/DarkModeContext';
import SharedNav from './components/SharedNav';
import Hero from './components/Hero';
import TechnicalArsenal from './components/TechnicalArsenal';
import Projects from './components/Projects';
import Experience from './components/Experience';
import TechnicalImpact from './components/TechnicalImpact';
import ConnectWithMe from './components/ConnectWithMe';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import AchievementsPage from './pages/AchievementsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import TopNavBar from './components/TopNavBar';

function HomePage() {
  return (
    <div style={{ overflow: 'clip' }}>
      <SharedNav />
      <Hero />
      <TechnicalArsenal />
      <Projects />
      <Experience />
      <TechnicalImpact />
      <ConnectWithMe />
      <Achievements />
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
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
