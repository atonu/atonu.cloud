'use client';

import styles from './TechTicker.module.css';

const techs = [
  { name: 'TypeScript', icon: 'TS' },
  { name: '.NET', icon: '.N' },
  { name: 'Angular', icon: '⟨A⟩' },
  { name: 'React', icon: '⚛' },
  { name: 'Node.js', icon: '⬡' },
  { name: 'AWS', icon: '☁' },
  { name: 'Docker', icon: '🐳' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Redis', icon: '⚡' },
  { name: 'Go', icon: '◉' },
  { name: 'Python', icon: '🐍' },
  { name: 'Azure', icon: '☁' },
  { name: 'Firebase', icon: '🔥' },
];

export default function TechTicker() {
  const doubled = [...techs, ...techs];

  return (
    <div className={styles.ticker}>
      <p className={styles.tickerLabel}>TRUSTED TO DELIVER WITH MODERN TECHNOLOGIES</p>
      <div className={styles.tickerTrack}>
        <div className={styles.tickerInner}>
          {doubled.map((tech, i) => (
            <div key={i} id={`tech-${tech.name}-${i}`} className={styles.techItem}>
              <span className={styles.techIcon}>{tech.icon}</span>
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
