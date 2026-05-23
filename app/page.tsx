'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import CursorGradient from '@/components/CursorGradient';
import TechTicker from '@/components/TechTicker';
import About from '@/components/About';
import Skills from '@/components/Skills';
import WorkExperience from '@/components/WorkExperience';
import HobbiesCarousel from '@/components/HobbiesCarousel';
import EducationAccomplishments from '@/components/EducationAccomplishments';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Dynamic import for Three.js hero (SSR disabled)
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: false,
  loading: () => (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
    }}>
      <div style={{
        width: 48, height: 48,
        border: '4px solid var(--border-color)',
        borderTopColor: 'var(--accent-primary)',
        borderRadius: '50%',
        animation: 'spin-slow 0.8s linear infinite',
      }} />
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <CursorGradient />
      <div className="layout">
        <Navbar />
        <main className="main-content">
          <HeroSection />
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
        </main>
      </div>
    </>
  );
}
