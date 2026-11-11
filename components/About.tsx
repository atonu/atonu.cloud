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
  const introDialogRef = useRef<HTMLDialogElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  const openIntroVideo = () => {
    const dialog = introDialogRef.current;
    const video = introVideoRef.current;
    if (!dialog || !video) return;

    dialog.showModal();
    video.currentTime = 0;
    void video.play().catch((error: unknown) => {
      console.error('Unable to play the intro video', error);
    });
  };

  const closeIntroVideo = () => {
    introVideoRef.current?.pause();
    if (introVideoRef.current) introVideoRef.current.currentTime = 0;
  };

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
          <div className={styles.introPreview}>
            <video
              className={styles.introPreviewVideo}
              src="/Intro.mp4"
              poster="/intro-poster.webp"
              preload="none"
              playsInline
              aria-hidden="true"
            >
              Your browser does not support the video tag.
            </video>
            <button
              type="button"
              className={styles.introPlayButton}
              onClick={openIntroVideo}
              aria-label="Play intro video"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
              </svg>
              <span>Play intro</span>
            </button>
          </div>
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
      <dialog
        ref={introDialogRef}
        className={styles.videoDialog}
        aria-label="Intro video player"
        onClose={closeIntroVideo}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <button
          type="button"
          className={styles.videoCloseButton}
          onClick={() => introDialogRef.current?.close()}
          aria-label="Close intro video"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m18 6-12 12M6 6l12 12" />
          </svg>
        </button>
        <video
          ref={introVideoRef}
          className={styles.videoPlayer}
          src="/Intro.mp4"
          poster="/intro-poster.webp"
          controls
          playsInline
          preload="none"
          aria-label="Atonu Ahmed introduction video"
        >
          Your browser does not support the video tag.
        </video>
      </dialog>
    </section>
  );
}
