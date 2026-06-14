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

import { useState, useRef, useEffect } from 'react';

// Dynamic imports for heavy components (SSR disabled)
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const ParallaxBackground = dynamic(() => import('@/components/ParallaxBackground'), { ssr: false });

export default function Home() {
  const [mainHeight, setMainHeight] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setMainHeight(entries[0].contentRect.height);
    });
    observer.observe(mainRef.current);
    return () => observer.disconnect();
  }, []);

  const stickyStyle = mainHeight > 0 ? {
    position: 'sticky' as const,
    top: `calc(100vh - ${mainHeight}px)`,
    zIndex: 1
  } : {
    position: 'relative' as const,
    zIndex: 1
  };

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Parallax particle background - fixed */}
      <ParallaxBackground />

      <div className="layout">
        <Navbar />

        <main className="main-content" id="main">
          {/* Main single page content with stack effect logic */}
          <div ref={mainRef} style={stickyStyle}>
            {/* Hero section */}
            <HeroSection id="home" />

            {/* Regular flow for all other sections */}
            <TechTicker />
            <div className="divider" />

            <LazySection id="about" minHeight="80vh">
              <About />
            </LazySection>

            <div className="divider" />

            <LazySection id="skills" minHeight="160vh">
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
          </div>

          {/* Contact section overlapping card */}
          <div 
            style={{ 
              position: 'relative', 
              zIndex: 2, 
              background: 'var(--bg-primary)',
              boxShadow: '0 -25px 50px -12px rgba(0,0,0,0.5)',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <div className="divider" />
            <Contact />
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
