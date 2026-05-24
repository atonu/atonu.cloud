'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import styles from './About.module.css';

// Dynamic import for Three.js (reuse the 3D scene from Hero)
const ThreeScene = dynamic(() => import('./AboutThreeScene'), {
  ssr: false, loading: () => (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg-card)', borderRadius: 24 }} />
  )
});

const highlights = [
  { icon: '🚀', text: 'Led migration of high-volume telemetry to cloud storage, significantly reducing costs' },
  { icon: '📈', text: 'Lead developer of a product that increased sales by 70%' },
  { icon: '🔗', text: 'Technical lead on blockchain-based SaaS with smart contracts' },
  { icon: '🤖', text: 'Engineered LLM for localization and enhanced RAG-based AI knowledge base' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="about" className="section" ref={ref}>
      <div className={`section-inner ${styles.about}`}>
        {/* LEFT: 3D Workstation and details (Scrolls) */}
        <div className={styles.sceneCol}>
          <div className={styles.sceneFrame}>
            <ThreeScene />

            <div className={styles.avatarBadge}>
              <span>Dhaka, Bangladesh</span>
            </div>

            <div className={styles.experienceBadge}>
              <span className={styles.expNum}>7+</span>
              <span className={styles.expText}>Years Exp.</span>
            </div>
          </div>

          <div className={styles.highlights}>
            {highlights.map((h, i) => (
              <div key={i} className={styles.highlight} data-hover>
                <span className={styles.highlightIcon}>{h.icon}</span>
                <span className={styles.highlightText}>{h.text}</span>
              </div>
            ))}
          </div>

          <div className={styles.contactInfo}>
            {[
              { icon: '✉', text: 'atonu.zahin@gmail.com', href: 'mailto:atonu.zahin@gmail.com' },
              { icon: '📞', text: '+8801760605684', href: 'tel:+8801760605684' },
              { icon: '🔗', text: 'LinkedIn', href: 'https://linkedin.com/in/ahmed-atonu-23ab08130' },
            ].map((item, i) => (
              <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={styles.contactItem}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT: Text (Sticky) */}
        <div className={styles.textCol}>
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            Crafting <span>Digital Experiences</span> with Passion
          </h2>
          <p className={styles.bio}>
            I&apos;m a Senior Software Engineer and Product Manager with over 7 years of experience
            building full-stack SaaS platforms and microservices architecture. Based in Dhaka,
            Bangladesh, I specialize in creating high-performance, scalable systems.
          </p>
          <p className={styles.bio}>
            From architecting distributed cloud systems to leading blockchain-based product
            development, I thrive at the intersection of technical excellence and product thinking.
          </p>
        </div>
      </div>
    </section>
  );
}
