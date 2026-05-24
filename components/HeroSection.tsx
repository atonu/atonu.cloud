'use client';

import Image from 'next/image';
import styles from './Hero.module.css';

export default function HeroSection() {
  return (
    <section id="home" className={styles.hero}>
      {/* Sticky hero background */}
      <div className={styles.heroSticky}>
        {/* Download CV button top right (furthest to right) */}
        <a href="#contact" id="download-cv" className={styles.downloadCvBtn} aria-label="Download CV">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Download CV
        </a>

        {/* Left: Text content */}
        <div className={styles.heroContent}>

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
            Product Manager
          </h2>
          <p className={styles.description}>
            7+ years building full-stack SaaS products,<br />
            microservices, and elegant digital experiences.
          </p>

          <div className={styles.ctaGroup}>
            <button
              id="view-projects-btn"
              className="btn-primary"
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects →
            </button>
            <a id="contact-btn" href="mailto:atonu.zahin@gmail.com" className="btn-secondary">
              Let&apos;s Connect ↗
            </a>
          </div>

          {/* Stats Bar */}
          <div className={styles.statsBar}>
            {[
              { icon: '🧳', value: '7+', label: 'Years Experience', sub: 'Building scalable SaaS products since 2018' },
              { icon: '◈', value: 'Full-stack &', label: 'Microservices', sub: 'Architecting robust systems that scale' },
              { icon: '⬡', value: 'SELISE', label: 'Group AG', sub: 'Senior Software Engineer & Product Manager' },
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

        {/* Right: Static Image */}
        <div className={styles.heroImageContainer}>
          <Image
            src="/avatars/hero-main.png"
            alt="Atonu Ahmed avatar"
            fill
            className={styles.heroStaticImage}
            priority
          />
        </div>
      </div>
    </section>
  );
}
