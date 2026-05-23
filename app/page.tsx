'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import TechTicker from '@/components/TechTicker';
import About from '@/components/About';
import Skills from '@/components/Skills';
import WorkExperience from '@/components/WorkExperience';
import HobbiesCarousel from '@/components/HobbiesCarousel';
import EducationAccomplishments from '@/components/EducationAccomplishments';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Dynamic imports for canvas-based components (SSR disabled)
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: false,
  loading: () => (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 48, height: 48, border: '4px solid rgba(245,166,35,0.2)', borderTopColor: '#f5a623', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
    </div>
  ),
});

const ParallaxBackground = dynamic(() => import('@/components/ParallaxBackground'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Parallax particle background - fixed */}
      <ParallaxBackground />

      {/* Cursor gradient glow */}
      <div className="cursor-gradient" aria-hidden="true" />

      <div className="layout">
        <Navbar />

        <main className="main-content" id="main">
          {/* Hero - sticky background */}
          <HeroSection />

          {/* Content that scrolls over the hero */}
          <div style={{ position: 'relative', zIndex: 2, background: 'var(--bg-primary)' }}>
            <TechTicker />
            <div className="divider" />
            <About />
            <div className="divider" />
            <Skills />
            <div className="divider" />
            <WorkExperience />
            <div className="divider" />
            <HobbiesCarousel />
            <div className="divider" />
            <EducationAccomplishments />
            <div className="divider" />
            <Contact />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
