'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

const highlights = [
  { icon: '🚀', text: 'Led migration of high-volume telemetry to cloud storage, significantly reducing costs' },
  { icon: '📈', text: 'Lead developer of a product that increased sales by 70%' },
  { icon: '🔗', text: 'Technical lead on blockchain-based SaaS product with smart contracts' },
  { icon: '🤖', text: 'Engineered LLM for localization and enhanced RAG-based AI knowledge bases' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const avatarY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px']);
  const textY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);

  return (
    <section id="about" className="section" ref={ref}>
      <div className={`section-inner ${styles.about}`}>
        {/* Avatar Column */}
        <motion.div className={styles.avatarCol} style={{ y: avatarY }}>
          <div className={styles.avatarFrame}>
            <Image
              src="/avatars/about.png"
              alt="Atonu Ahmed waving"
              width={340}
              height={400}
              className={styles.avatarImg}
            />
            <div className={styles.avatarBadge}>
              <span>🇧🇩</span>
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className={styles.experienceBadge}>
              <span className={styles.expNum}>7+</span>
              <span className={styles.expText}>Years of Experience</span>
            </div>
          </div>
        </motion.div>

        {/* Text Column */}
        <motion.div className={styles.textCol} style={{ y: textY }}>
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            Crafting <span>Digital Experiences</span> with Passion
          </h2>
          <p className={styles.bio}>
            I&apos;m a Senior Software Engineer and Product Manager with over 7 years of experience 
            building full-stack SaaS platforms and microservices architecture. Based in Dhaka, 
            Bangladesh, I specialize in creating high-performance, scalable systems that power 
            modern digital products.
          </p>
          <p className={styles.bio}>
            From architecting distributed cloud systems to leading blockchain-based product 
            development, I thrive at the intersection of technical excellence and product thinking. 
            I&apos;m an enthusiastic, hard-working, and quick learner who loves turning complex 
            problems into elegant solutions.
          </p>

          {/* Highlights */}
          <div className={styles.highlights}>
            {highlights.map((h, i) => (
              <div key={i} className={styles.highlight}>
                <span className={styles.highlightIcon}>{h.icon}</span>
                <span className={styles.highlightText}>{h.text}</span>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            {[
              { icon: '✉', text: 'atonu.zahin@gmail.com', href: 'mailto:atonu.zahin@gmail.com' },
              { icon: '📞', text: '+8801760605684', href: 'tel:+8801760605684' },
              { icon: '🔗', text: 'LinkedIn Profile', href: 'https://linkedin.com/in/ahmed-atonu-23ab08130' },
            ].map((item, i) => (
              <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={styles.contactItem}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
