'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './About.module.css';

// Dynamic import for Three.js (reuse the 3D scene from Hero)
const ThreeScene = dynamic(() => import('./AboutThreeScene'), {
  ssr: false, loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', borderRadius: 24 }}>
      <div className={styles.spinner}></div>
    </div>
  )
});

const highlights = [
  { icon: '🚀', text: 'Designed high-volume telemetry synchronization to cold storage, significantly reducing costs' },
  { icon: '📈', text: 'Lead developer of a SaaS product associated with a 70% increase in sales' },
  { icon: '🔗', text: 'Technical manager and front-end lead for a blockchain SaaS product with smart contracts' },
  { icon: '🤖', text: 'Built AI-based localization capabilities and RAG-based knowledge systems' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section className="section" ref={ref}>
      <div className={`section-inner ${styles.about}`}>
        {/* LEFT: 3D Workstation and details (Scrolls) */}
        <div className={styles.sceneCol}>

          <motion.div
            className={styles.aboutImageWrapper}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -48, y: 24 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <Image
              src="/avatars/about.webp"
              alt="Atonu Ahmed"
              width={400}
              height={350}
              className={styles.aboutAvatarImg}
            />
          </motion.div>

          <div className={styles.highlights}>
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                className={styles.highlight}
                data-hover
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <span className={styles.highlightIcon}>{h.icon}</span>
                <span className={styles.highlightText}>{h.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.sceneFrame}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <ThreeScene />

            <motion.div
              className={styles.avatarBadge}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.55 }}
            >
              <span>Dhaka, Bangladesh</span>
            </motion.div>

            <motion.div
              className={styles.experienceBadge}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24, y: -24 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.55 }}
            >
              <span className={styles.expNum}>8+</span>
              <span className={styles.expText}>Years Exp.</span>
            </motion.div>
          </motion.div>

          <div id="ai-products" className={styles.aiProductsSection}>
            <motion.p
              className="section-label"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
            >
              AI Products
            </motion.p>
            <motion.h2
              className="section-title"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              Intelligent <span>Solutions</span>
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              Production-ready intelligence and analytic tools built to scale
            </motion.p>
            <div className={styles.aiCardsStack}>
              {[
                { name: 'Edgetech', link: 'https://edgetech.com.bd/', desc: 'Edge intelligence for real-time sensor processing and control.', bg: '/edgetech.webp' },
                { name: 'BI-Lite', link: 'https://lit-bi.vercel.app/', desc: 'Lightweight, high-performance Business Intelligence engine.', bg: '/bi-lite.webp' },
                { name: 'Vellora', link: 'https://vellora-fe.vercel.app/', desc: 'State-of-the-art conversational AI interface.', bg: '/vellora.webp' },
              ].map((prod, i) => (
                <motion.a
                  key={prod.name}
                  href={prod.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card ${styles.aiCard}`}
                  data-hover
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: i % 2 === 0 ? -48 : 48, y: 24 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <div className={styles.aiCardBg} style={{ backgroundImage: `url(${prod.bg})` }} />
                  <div className={styles.aiCardHeader}>
                    <h3 className={styles.aiCardName}>{prod.name}</h3>
                    <span className={styles.aiCardArrow}>↗</span>
                  </div>
                  <p className={styles.aiCardDesc}>{prod.desc}</p>
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT: Text (Sticky) */}
        <div className={styles.textCol}>
          <motion.p
            className="section-label"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            About Me
          </motion.p>
          <motion.h2
            className="section-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48, y: -24 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            Crafting <span>Digital Experiences</span> with Passion
          </motion.h2>
          <motion.p
            className={styles.bio}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48, y: 24 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            I&apos;m a Senior Software Engineer and Forward Deployed Engineer with 8+ years of
            experience delivering scalable software and enterprise solutions across Switzerland,
            Germany, Bangladesh, and the USA. I combine hands-on full-stack engineering with
            AI integration, distributed systems, product ownership, and client-facing delivery.
          </motion.p>
          <motion.p
            className={styles.bio}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48, y: 24 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.24 }}
          >
            I&apos;m dependable, adaptive, and a fast learner, with experience leading technical teams,
            aligning stakeholder and user needs, and shipping production-ready SaaS and ERP systems.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
