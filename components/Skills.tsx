'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import styles from './Skills.module.css';

const coreSkills = [
  { name: 'TypeScript', level: 95, color: '#3178c6' },
  { name: 'Angular', level: 92, color: '#dd0031' },
  { name: 'React', level: 88, color: '#61dafb' },
  { name: '.NET / C#', level: 85, color: '#512bd4' },
  { name: 'Node.js', level: 85, color: '#3c873a' },
  { name: 'MongoDB', level: 80, color: '#47a248' },
];

const skillRings = [
  { name: 'Full Stack', value: 95 },
  { name: 'Cloud / AWS', value: 82 },
  { name: 'DevOps', value: 78 },
  { name: 'Product Mgmt', value: 88 },
];

const techTags = [
  'JavaScript', 'HTML/CSS', 'Go', 'Python', 'Azure', 'Blockchain',
  'Docker', 'Redis', 'PostgreSQL', 'CI/CD', 'C++', 'SQL',
  'Firebase', 'Amazon S3', 'State Management', 'Sass', 'Grid/Flex',
  'PWA', 'Microservices', 'REST APIs', 'GraphQL', 'Tailwind',
];

function SkillRing({ name, value }: { name: string; value: number }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={styles.ringItem}>
      <div className={styles.ring}>
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r={radius} stroke="var(--skill-bar-bg)" strokeWidth="7" fill="none" />
          <motion.circle
            cx="45" cy="45" r={radius}
            stroke="var(--accent-primary)" strokeWidth="7" fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          />
        </svg>
        <span className={styles.ringValue}>{value}%</span>
      </div>
      <span className={styles.ringLabel}>{name}</span>
    </div>
  );
}

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className={styles.skillBar}>
      <div className={styles.skillBarHeader}>
        <span className={styles.skillBarName}>{name}</span>
        <span className={styles.skillBarLevel}>{level}%</span>
      </div>
      <div className={styles.skillBarTrack}>
        <motion.div
          className={styles.skillBarFill}
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="skills" className="section" ref={ref}
      style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}
    >
      <div className="section-inner">
        <p className="section-label">Technical Expertise</p>
        <h2 className="section-title">Skills &amp; <span>Technologies</span></h2>
        <p className="section-subtitle">
          A diverse toolkit built over 7+ years of real-world product engineering
        </p>

        <div className={styles.skillsGrid}>
          {/* Skill rings */}
          <div className={styles.ringsSection}>
            <h3 className={styles.subsectionTitle}>Competency Overview</h3>
            <div className={styles.rings}>
              {skillRings.map((r) => <SkillRing key={r.name} {...r} />)}
            </div>
          </div>

          {/* Skill bars */}
          <div className={styles.barsSection}>
            <h3 className={styles.subsectionTitle}>Core Technologies</h3>
            <div className={styles.bars}>
              {coreSkills.map((s) => <SkillBar key={s.name} {...s} />)}
            </div>
          </div>
        </div>

        {/* Tech tags cloud */}
        <div className={styles.tagCloud}>
          <h3 className={styles.subsectionTitle} style={{ marginBottom: '20px' }}>Also proficient in</h3>
          <div className={styles.tags}>
            {techTags.map((tag, i) => (
              <motion.span
                key={tag}
                className="tag"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
