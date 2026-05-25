'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Marco Linsenmann',
    role: 'AI Execution Partner | From clarity to AI that works | Building trusted AI systems for real business outcomes',
    date: 'June 13, 2023, Ahmed was Marco\'s client',
    text: 'I had the pleasure of working closely with Ahmed over the past years. His deep technical expertise, proactive approach, and strong problem-solving skills have consistently added real value to our projects. Beyond his professional qualities, his collaborative spirit made every challenge easier to tackle. Highly recommended.',
    image: '/avatars/marco.jpg',
  },
  {
    name: 'MD. RAIHAN MAHAMUD',
    role: 'Senior Software Engineer at SELISE Digital Platforms',
    date: 'August 17, 2024, MD. RAIHAN worked with Ahmed on the same team',
    text: 'I had the opportunity to work closely with Ahmed Atonu when he served as a Software Engineer on our team. I valued his expertise, especially in frontend-backend integration and ensuring best practices were followed. He consistently delivered optimized solutions and demonstrated outstanding proficiency in CSS, making our web interfaces both visually appealing and highly functional.\n\nHis attention to detail and thorough testing of the frontend components helped us identify and resolve issues early on. He was proactive in reporting any concerns and collaborating effectively to ensure smooth integration across the stack....',
    image: '/avatars/raihan.jpg',
  }
];

function Card({
  testimonial,
  i,
  progress,
  range,
  targetScale
}: {
  testimonial: { name: string; role: string; company?: string; text: string; image: string; date?: string; };
  i: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div className={styles.cardContainer}>
      <motion.a
        href="https://www.linkedin.com/in/ahmed-atonu-23ab08130/details/recommendations/"
        target="_blank"
        rel="noreferrer"
        className={`card ${styles.card}`}
        style={{ 
          scale, 
          marginTop: `${i * 30}px` 
        }}
      >
        <div className={styles.cardHeader}>
          <div className={styles.avatarWrap}>
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={64}
              height={64}
              className={styles.avatar}
            />
          </div>
          <div>
            <h3 className={styles.name}>{testimonial.name}</h3>
            <p className={styles.role}>{testimonial.role}</p>
            <p className={styles.date}>{testimonial.date}</p>
          </div>
          <div className={styles.linkedinIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </div>
        </div>
        <div className={styles.cardBody}>
          {testimonial.text.split('\n\n').map((para: string, idx: number) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </motion.a>
    </div>
  );
}

export default function Testimonials() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section className="section" id="testimonials" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-inner" style={{ position: 'relative' }}>
        <div className={styles.headerStickyWrapper}>
          <div className={styles.headerSticky}>
            <div className={styles.headerContent}>
              <p className="section-label">LinkedIn Recommendations</p>
              <h2 className="section-title">What <span>People Say</span></h2>
            </div>
          </div>
        </div>
        
        <div ref={container} className={styles.container}>
          {testimonials.map((t, i) => {
            // Target scale decreases more for earlier cards
            const targetScale = 1 - ((testimonials.length - 1 - i) * 0.05);
            return (
              <Card 
                key={i} 
                i={i} 
                testimonial={t} 
                progress={scrollYProgress} 
                range={[i * (1 / testimonials.length), 1]} 
                targetScale={targetScale} 
              />
            );
          })}
          <div style={{ height: '30vh' }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
