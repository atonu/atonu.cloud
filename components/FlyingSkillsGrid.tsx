'use client';

import { useRef, ReactNode, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent } from 'framer-motion';
import styles from './FlyingSkillsGrid.module.css';

const tags = [
  'JavaScript', 'HTML/CSS', 'Go', 'Python', 'Azure', 'Blockchain',
  'Docker', 'Redis', 'PostgreSQL', 'CI/CD', 'C++', 'SQL',
  'Firebase', 'Amazon S3', 'State Mgmt', 'Sass', 'Grid/Flex',
  'PWA', 'Microservices', 'REST APIs', 'GraphQL', 'Tailwind',
  'WebRTC', 'WebSockets', 'AWS', 'GCP', 'Linux', 'Vite'
];

function GridItem({
  tag,
  index,
  scrollYProgress,
  isActive,
  isSpecial
}: {
  tag: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  isActive: boolean;
  isSpecial?: boolean;
}) {
  const start = isSpecial ? 0.1 : (((index * 3) % 70) / 100); // 0.0 to 0.69
  const end = isSpecial ? 0.8 : start + 0.3; // 0.3 to 0.99
  const mid = (start + end) / 2;

  const zTransform = useTransform(scrollYProgress, [start, mid, end], [-1000, 0, 1000], { clamp: true });
  const opacityTransform = useTransform(scrollYProgress, [start, mid, end], [0, 1, 0], { clamp: true });

  const z = useTransform(() => isActive ? zTransform.get() : -1000);
  const opacity = useTransform(() => isActive ? opacityTransform.get() : 0);

  const gridArea = isSpecial 
    ? '2 / 2 / span 2 / span 2' 
    : `${(index % 4) + 1} / ${Math.floor(index / 4) % 4 + 1}`;

  return (
    <motion.div
      className={`${styles.gridItem} ${isSpecial ? styles.special : ''}`}
      style={{ z, opacity, gridArea }}
    >
      {isSpecial ? <b>{tag}</b> : tag}
    </motion.div>
  );
}

export default function FlyingSkillsGrid({ children }: { children?: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'] 
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.99) {
      setIsActive(false); // Reset when scrolled past
    } else if (latest <= 0.01) {
      setIsActive(true); // Reactivate when back at the top
    }
  });

  return (
    <div className={styles.flyingWrapper} ref={containerRef}>
      <div className={styles.stuckGrid}>
        {tags.map((tag, i) => (
          <GridItem 
            key={i} 
            tag={tag} 
            index={i} 
            scrollYProgress={scrollYProgress} 
            isActive={isActive}
          />
        ))}
      </div>

      {/* Content overlaid at Z=0 */}
      {children && (
        <div className={styles.overlayContent}>
          {children}
        </div>
      )}
    </div>
  );
}
