'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './WorkExperience.module.css';

const experiences = [
  {
    role: 'Senior Software Engineer',
    company: 'SELISE Group AG',
    period: '2023/11 — 2026/04',
    flag: '🇨🇭',
    current: true,
    bullets: [
      'Engineered scalable distributed SaaS systems ensuring precision for data-intensive platforms',
      'Technical manager, client-facing developer and front-end lead of blockchain-based SaaS with smart contracts',
      'Led migration of high-volume telemetry data from primary DB to cloud storage, significantly reducing costs',
      'Engineered LLM for localization capabilities',
      'Maintained clean coding, cache controlling, code reviewing, version controlling',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'SELISE Group AG',
    period: '2019/04 — 2023/11',
    flag: '🇨🇭',
    bullets: [
      'Full-stack development on enterprise SaaS platform',
      'Front-end lead for key product lines',
      'Promoted to Senior Software Engineer and Product Manager',
    ],
  },
  {
    role: 'Operations Manager',
    company: 'SELISE Group AG',
    period: '2025/01 — 2025/10',
    flag: '🇨🇭',
    bullets: [
      'Product manager of SaaS product SELISE Signature',
      'Enhanced RAG-based knowledge base for AI agent',
    ],
  },
  {
    role: 'Software Engineer (Remote)',
    company: 'UptimeCrew',
    location: 'Indianapolis, USA',
    period: '2024/02 — 2024/06',
    flag: '🇺🇸',
    bullets: [
      'Developed modules with Atomic Design Pattern in React with Vite',
      'Implemented Geofencing, Distance Matrix, Routes API with Google Maps SDK',
    ],
  },
  {
    role: 'Software Engineer (Remote)',
    company: 'Movido Media Verlag GmbH',
    location: 'Düsseldorf, Germany',
    period: '2021/10 — 2022/10',
    flag: '🇩🇪',
    bullets: [
      'Developed maintainable template-driven Angular components with lazy loading and guarded routes',
      'Created APIs and data models with Go and MySQL',
      'File management with Amazon S3 via minIO',
      'Created FTP client with Go integrating a German postal service API',
      'Responsive UI developments with SCSS and Flex',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Embedded Logic Operations',
    location: 'Dhaka, Bangladesh',
    period: '2018/10 — 2019/04',
    flag: '🇧🇩',
    bullets: [
      'Established ground work for 2 major projects with Angular',
      'Increased flexibility working across different frameworks and infrastructures',
    ],
  },
];

export default function WorkExperience() {
  return (
    <section id="experience" className={styles.expSection}>
      <div className={styles.expLayout}>
        {/* LEFT: Scrolling timeline */}
        <div className={styles.leftScroll}>
          <div className="timeline">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`card ${styles.expCard}`}>
                  <div className={styles.expHeader}>
                    <div>
                      <div className={styles.expMeta}>
                        <span className={styles.expFlag}>{exp.flag}</span>
                        {exp.current && <span className={styles.currentBadge}>● Current</span>}
                      </div>
                      <h3 className={styles.expRole}>{exp.role}</h3>
                      <div className={styles.expCompany}>
                        {exp.company}
                        {exp.location && <span className={styles.expLocation}> · {exp.location}</span>}
                      </div>
                    </div>
                    <div className={styles.expPeriod}>{exp.period}</div>
                  </div>
                  <ul className={styles.expBullets}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} className={styles.expBullet}>
                        <span className={styles.bulletDot}>→</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Sticky panel with Superman avatar */}
        <div className={styles.rightSticky}>
          <div className={styles.stickyContent}>
            <p className="section-label">Career Journey</p>
            <h2 className="section-title">Work<br /><span>Experience</span></h2>
            <p className={styles.stickyDesc}>
              From Dhaka to Europe and the USA — 7+ years building great software across borders
            </p>

            {/* Stats */}
            <div className={styles.expStats}>
              {[
                { num: '6', label: 'Companies' },
                { num: '4', label: 'Countries' },
                { num: '7+', label: 'Years' },
              ].map((s) => (
                <div key={s.label} className={styles.expStat}>
                  <div className={styles.expStatNum}>{s.num}</div>
                  <div className={styles.expStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Superman Avatar */}
            <div className={styles.supermanWrap}>
              <Image
                src="/avatars/superman.png"
                alt="Atonu as Superman"
                width={200}
                height={240}
                className={styles.supermanImg}
              />
              <div className={styles.supermanBadge}>⚡ Super Engineer!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
