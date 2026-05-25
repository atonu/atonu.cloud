'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import TechTicker from '@/components/TechTicker';
import WorkExperience from '@/components/WorkExperience';
import Testimonials from '@/components/Testimonials';
import HobbiesCarousel from '@/components/HobbiesCarousel';
import EducationAccomplishments from '@/components/EducationAccomplishments';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LazySection from '@/components/LazySection';

// Dynamic imports for heavy components (SSR disabled)
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const ParallaxBackground = dynamic(() => import('@/components/ParallaxBackground'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Parallax particle background - fixed */}
      <ParallaxBackground />

      <div className="layout">
        <Navbar />

        <main className="main-content" id="main">
          {/* Hero - sticky background */}
          <HeroSection id="home" />

          {/* Content that scrolls over the hero */}
          <div style={{ position: 'relative', zIndex: 2, background: 'var(--bg-primary)' }}>
            <TechTicker />
            <div className="divider" />

            <LazySection id="about" minHeight="80vh">
              <About />
            </LazySection>

            <div className="divider" />

            <LazySection id="skills" minHeight="100vh">
              <Skills />
            </LazySection>

            <div className="divider" />
            <WorkExperience />
            <div className="divider" />
            <Testimonials />
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
