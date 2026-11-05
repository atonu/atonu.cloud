'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

export default function HeroSection({ id }: { id?: string }) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 30, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["1deg", "-1deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-1deg", "1deg"]);
  const skewX = useTransform(smoothX, [-0.5, 0.5], ["-.5deg", ".5deg"]);
  const backgroundRotateX = useTransform(smoothY, [-0.5, 0.5], ["-1.25deg", "1.25deg"]);
  const backgroundRotateY = useTransform(smoothX, [-0.5, 0.5], ["1.25deg", "-1.25deg"]);
  const backgroundSkewX = useTransform(smoothX, [-0.5, 0.5], [".5deg", "-.5deg"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Skip expensive math if hero is completely covered by scrolled content
      if (window.scrollY > window.innerHeight) return;

      const { innerWidth, innerHeight } = window;
      const xPct = (e.clientX / innerWidth) - 0.5;
      const yPct = (e.clientY / innerHeight) - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id={id} className={styles.hero}>
      {/* Sticky hero background */}
      <div className={styles.heroSticky}>
        <motion.div
          className={styles.heroBackgroundImage}
          aria-hidden="true"
          style={
            reduceMotion
              ? undefined
              : {
                rotateX: backgroundRotateX,
                rotateY: backgroundRotateY,
                skewX: backgroundSkewX,
                transformStyle: 'preserve-3d',
              }
          }
        >
          <Image
            src="/avatars/hero-bg.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            className={styles.heroBackgroundPhoto}
          />
        </motion.div>
        {/* Download CV button top right (furthest to right) */}
        <a href="/Atonu_Ahmed_Resume.pdf" download="Atonu_Ahmed_Resume.pdf" id="download-cv" className={styles.downloadCvBtn} aria-label="Download CV">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Download CV
        </a>

        {/* Left: Text content */}
        <div className={styles.heroContent}>

          {/* available for hire temporarily enabled */}
          <div className={styles.availableBadge}>
            <span className="glow-dot" />
            <span>Available for hire</span>
          </div>

          <p className={styles.greeting}>Hi, I&apos;m</p>
          <h1 className={styles.name}>
            <span>Atonu </span>
            <span className={styles.nameAccent}>Ahmed</span>
          </h1>
          <h2 className={styles.title}>
            Senior Software Engineer &amp;<br />
            Forward Deployed Engineer
          </h2>
          <p className={styles.description}>
            Senior full-stack engineer with 8+ years delivering scalable software and enterprise solutions across Switzerland,<br />
            Germany, Bangladesh, and the USA. Promoted twice at SELISE Group AG and led a product associated with a 70% sales increase.<br />
            Hands-on expertise in AI infrastructure, distributed systems, B2B SaaS, product ownership, and client-facing delivery.
          </p>

          <div className={styles.ctaGroup}>
            <a
              id="view-projects-btn"
              className="btn-primary"
              href="#cases"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('cases');
                if (el) {
                  const targetY = el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
              }}
            >
              View Cases →
            </a>
            <a id="contact-btn" href="mailto:atonu.zahin@gmail.com" className="btn-secondary">
              Let&apos;s Connect ↗
            </a>
          </div>

          {/* Stats Bar */}
          <div className={styles.statsBar}>
            {[
              { icon: '🧳', value: '8+', label: 'Years Experience', sub: 'Building scalable SaaS products since 2018' },
              { icon: '◈', value: 'Full-stack &', label: 'Microservices', sub: 'Architecting robust systems that scale' },
              { icon: 'AI', value: 'Multi Agent Orchestration', label: 'AI Automation Workflows', sub: 'Claude Code, RAG, agents and human review' },
              { icon: '</>', value: 'TypeScript • .NET', label: 'Angular • React', sub: 'Modern stack for reliable applications' },
            ].map((s, i) => (
              <div key={i} id={`stat-card-${i}`} className={styles.statCard}>
                <div className={styles.statIcon}>{s.icon}</div>
                <div>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statSub}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Static Image with Tilt Effect */}
        <div className={styles.heroImageContainer} style={{ perspective: '1000px' }}>
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              rotateX,
              rotateY,
              skewX,
              transformStyle: 'preserve-3d'
            }}
          >
            <Image
              src="/avatars/hero-main.webp"
              alt="Atonu Ahmed avatar"
              fill
              className={styles.heroStaticImage}
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
