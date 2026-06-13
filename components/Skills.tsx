'use client';

import { motion } from 'framer-motion';
import FlyingSkillsGrid from './FlyingSkillsGrid';
import styles from './Skills.module.css';

const skillStars = [
  { name: 'Angular', color: '#dd0031' },
  { name: 'React', color: '#61dafb' },
  { name: '.NET', color: '#512bd4' },
  { name: 'NodeJS', color: '#3c873a' },
  { name: 'Azure', color: '#0078d4' },
  { name: 'Product Management', color: '#f5a623' },
];

const coreSkills = [
  { name: 'NextJS', level: 90, color: '#f5a623' },
  { name: 'NestJS', level: 88, color: '#e0234e' },
  { name: 'RAG', level: 85, color: '#a855f7' },
  { name: 'SOLID design principle', level: 92, color: '#3b82f6' },
  { name: 'Design Pattern', level: 90, color: '#10b981' },
  { name: 'MongoDB', level: 85, color: '#47a248' },
  { name: 'DevOps', level: 82, color: '#2496ed' },
  { name: 'Claude code', level: 88, color: '#d97706' },
  { name: 'Gemini', level: 90, color: '#4285f4' },
  { name: 'AI Automation', level: 86, color: '#8b5cf6' },
  { name: 'PWA', level: 88, color: '#5a0fc8' },
  { name: 'Golang', level: 80, color: '#00add8' },
  { name: 'Python', level: 84, color: '#3776ab' },
  { name: 'Blockchain', level: 85, color: '#f5a623' },
  { name: 'Docker', level: 82, color: '#2496ed' },
  { name: 'Redis', level: 80, color: '#d82c20' },
  { name: 'PostgreSQL', level: 86, color: '#336791' },
  { name: 'CI/CD', level: 85, color: '#208838' },
  { name: 'C++', level: 78, color: '#00599c' },
  { name: 'C#', level: 85, color: '#178600' },
  { name: 'SQL', level: 88, color: '#00bcff' },
  { name: 'Firebase', level: 85, color: '#ffca28' },
  { name: 'Amazon S3', level: 84, color: '#ff9900' },
  { name: 'Sass', level: 88, color: '#cc6699' },
  { name: 'Tailwind', level: 90, color: '#38bdf8' },
  { name: 'Grid/Flex', level: 95, color: '#ff5a00' },
];

function SkillStar({ name }: { name: string; color: string }) {
  const gradientId = `goldStarGrad-${name.replace(/\s+/g, '-')}`;
  return (
    <div className={styles.starItem}>
      <motion.div
        className={styles.starWrapper}
        whileHover={{ scale: 1.08, translateY: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className={styles.starSvg}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c59b27" />   {/* Deep Gold */}
              <stop offset="35%" stopColor="#f5a623" />  {/* Golden Orange Accent */}
              <stop offset="75%" stopColor="#ffd700" />  {/* Bright Gold */}
              <stop offset="100%" stopColor="#ffffff" /> {/* White Top-Right */}
            </linearGradient>
          </defs>
          <path
            d="M 60 14.8 L 76.5 42.2 L 107.6 49.4 L 86.6 73.5 L 89.4 105.3 L 60 92.8 L 30.6 105.3 L 33.4 73.5 L 12.5 49.4 L 43.5 42.2 Z"
            fill={`url(#${gradientId})`}
            stroke={`url(#${gradientId})`}
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
            className={styles.starPath}
            style={{ filter: 'drop-shadow(0 4px 10px rgba(245, 166, 35, 0.25))' }}
          />
        </svg>
        <span className={styles.starLabel}>{name}</span>
      </motion.div>
    </div>
  );
}

function SkillChip({ name, color }: { name: string; color: string }) {
  return (
    <motion.div
      className={styles.skillChip}
      style={{
        borderColor: `${color}28`,
        background: 'rgba(255, 255, 255, 0.02)',
      }}
      whileHover={{
        scale: 1.04,
        borderColor: color,
        background: `${color}10`,
        boxShadow: `0 4px 12px ${color}20`,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <span 
        className={styles.chipDot} 
        style={{ 
          backgroundColor: color, 
          boxShadow: `0 0 8px ${color}` 
        }} 
      />
      <span className={styles.chipName}>{name}</span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className={styles.skillsSection}>
      <FlyingSkillsGrid>
        <div className={styles.skillsInner}>
          <p className="section-label">Technical Expertise</p>
          <h2 className="section-title">Skills &amp; <span>Technologies</span></h2>
          <p className="section-subtitle">A diverse toolkit built over 7+ years of real-world engineering</p>

          <div className={styles.skillsGrid}>
            <div className={styles.ringsSection}>
              <h3 className={styles.subsectionTitle}>Competency</h3>
              <div className={styles.starsGrid}>
                {skillStars.map((s) => <SkillStar key={s.name} {...s} />)}
              </div>
            </div>

            <div className={styles.barsSection}>
              <h3 className={styles.subsectionTitle}>Core Stack</h3>
              <div className={styles.bars}>
                {coreSkills.map((s) => <SkillChip key={s.name} {...s} />)}
              </div>
            </div>
          </div>
        </div>
      </FlyingSkillsGrid>
    </section>
  );
}

