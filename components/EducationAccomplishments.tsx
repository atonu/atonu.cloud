'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './EducationAccomplishments.module.css';

const accomplishments = [
  { icon: '🚀', text: 'Promoted to Product Manager & Senior Software Engineer at SELISE Group AG' },
  { icon: '📈', text: 'Lead developer of a product that increased sales by 70%' },
  { icon: '🌐', text: 'Appointed as client-facing developer and front-end team lead' },
  { icon: '🏆', text: 'Runner up in CS-Fest 2019, AIUB — Intra-University Programming Contest' },
  { icon: '🎬', text: 'Runner up in Children\'s Film Festival 2015 (Children\'s Film Society Bangladesh)' },
];

export default function EducationAccomplishments() {
  return (
    <section id="education" className="section"
      style={{ background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)' }}
    >
      <div className="section-inner">
        <div className={styles.grid}>
          {/* Education */}
          <div>
            <p className="section-label">Academic Background</p>
            <h2 className="section-title">Edu<span>cation</span></h2>

            <motion.div
              className={`card ${styles.eduCard}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.eduIcon}>🎓</div>
              <div>
                <div className={styles.eduPeriod}>2014 — 2019</div>
                <h3 className={styles.eduDegree}>BSc in Software Engineering</h3>
                <div className={styles.eduInstitution}>
                  American International University Bangladesh
                </div>
                <p className={styles.eduNote}>
                  Runner up in CS-Fest 2019 intra-university programming contest
                </p>
              </div>
            </motion.div>

            {/* Avatar peaking in */}
            <motion.div
              className={styles.peakAvatar}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Image
                src="/avatars/graduation.png"
                alt="Atonu peeking in"
                width={280}
                height={320}
                className={styles.peakAvatarImg}
              />
              <div className={styles.peakSpeech}>
                BSc in Software Engineering! 🎓
              </div>
            </motion.div>
          </div>

          {/* Accomplishments */}
          <div>
            <p className="section-label">Key Achievements</p>
            <h2 className="section-title">Accom<span>plishments</span></h2>

            <div className={styles.accomplishments}>
              {accomplishments.map((a, i) => (
                <motion.div
                  key={i}
                  className={`card ${styles.accomplishment}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className={styles.accomplishIcon}>{a.icon}</div>
                  <p className={styles.accomplishText}>{a.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
