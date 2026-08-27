'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './WorkExperience.module.css';

type Experience = {
  role: string;
  company: string;
  period: string;
  periods?: string[];
  flag: string;
  bullets: string[];
  location?: string;
  current?: boolean;
};

const experiences: Experience[] = [
  {
    role: 'Senior ERP & AI Integrations Engineer',
    company: 'RemoteIntegrity',
    period: '2026/08 — Present',
    flag: '🇺🇸',
    bullets: [
      'Building a ERP as SAAS platform',
      'Forward Deployed Engineering',
      'Integrating with CRM',
      'Building AI navite solution',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'SELISE Group AG',
    period: '2023/11 — 2026/04',
    flag: '🇨🇭',
    bullets: [
      'Engineered scalable distributed SaaS systems ensuring precision for data-intensive platforms',
      'Technical manager, client-facing developer and front-end lead of blockchain-based SaaS with smart contracts',
      'Led migration of high-volume telemetry data from primary DB to cloud storage, significantly reducing costs',
      'Engineered LLM for localization capabilities',
      'Maintained clean coding, cache controlling, code reviewing, version controlling',
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
    company: 'ELO',
    location: 'Dhaka, Bangladesh',
    period: '2018/10 — 2019/04',
    periods: ['2026/05 — Present', '2018/10 — 2019/04'],
    flag: '🇧🇩',
    bullets: [
      'Full stack developer for client projects',
      'Increased flexibility working across different frameworks and infrastructures',
    ],
  },
];

const WIND_STREAKS = [
  { top: '12%', left: '10%', width: '380px', phase: 1, delay: '0s' },
  { top: '22%', left: '30%', width: '450px', phase: 1, delay: '0.05s' },
  { top: '35%', left: '5%', width: '520px', phase: 1, delay: '0.1s' },
  { top: '48%', left: '25%', width: '400px', phase: 1, delay: '0.15s' },
  { top: '62%', left: '15%', width: '480px', phase: 1, delay: '0.08s' },
  { top: '75%', left: '40%', width: '360px', phase: 1, delay: '0.12s' },
  { top: '88%', left: '8%', width: '420px', phase: 1, delay: '0.04s' },
  // Phase 2 streaks (return flyby)
  { top: '18%', left: '20%', width: '460px', phase: 2, delay: '0.85s' },
  { top: '30%', left: '5%', width: '540px', phase: 2, delay: '0.9s' },
  { top: '42%', left: '35%', width: '420px', phase: 2, delay: '0.95s' },
  { top: '55%', left: '12%', width: '500px', phase: 2, delay: '0.88s' },
  { top: '68%', left: '28%', width: '480px', phase: 2, delay: '0.92s' },
  { top: '82%', left: '18%', width: '390px', phase: 2, delay: '0.86s' },
];

function playSupersonicAudio() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // 1. Air Turbulence & Wind Whoosh (Synthesized Filtered Noise)
    const bufferSize = Math.floor(ctx.sampleRate * 2.3);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.Q.setValueAtTime(2.2, now);
    bandpass.frequency.setValueAtTime(200, now);
    bandpass.frequency.exponentialRampToValueAtTime(3400, now + 0.38);
    bandpass.frequency.exponentialRampToValueAtTime(320, now + 0.7);
    bandpass.frequency.setValueAtTime(450, now + 0.85);
    bandpass.frequency.exponentialRampToValueAtTime(3900, now + 1.25);
    bandpass.frequency.exponentialRampToValueAtTime(140, now + 2.05);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.65, now + 0.28);
    noiseGain.gain.exponentialRampToValueAtTime(0.04, now + 0.68);
    noiseGain.gain.exponentialRampToValueAtTime(0.75, now + 1.22);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.1);

    noiseSource.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(now);
    noiseSource.stop(now + 2.2);

    // 2. Sub-Bass Sonic Boom Pulse
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.45);
    osc.frequency.setValueAtTime(135, now + 0.85);
    osc.frequency.exponentialRampToValueAtTime(32, now + 1.8);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(380, now);
    lowpass.frequency.exponentialRampToValueAtTime(65, now + 0.5);
    lowpass.frequency.setValueAtTime(340, now + 0.9);
    lowpass.frequency.exponentialRampToValueAtTime(55, now + 1.85);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.exponentialRampToValueAtTime(0.48, now + 0.15);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
    oscGain.gain.exponentialRampToValueAtTime(0.38, now + 1.15);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.05);

    osc.connect(lowpass);
    lowpass.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 2.15);
  } catch {
    // Graceful fallback if Web Audio is unsupported
  }
}

export default function WorkExperience() {
  const [isFlying, setIsFlying] = useState(false);
  const flightTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSupermanClick = () => {
    if (isFlying) return;
    setIsFlying(true);
    playSupersonicAudio();

    if (flightTimerRef.current) {
      clearTimeout(flightTimerRef.current);
    }
    flightTimerRef.current = setTimeout(() => {
      setIsFlying(false);
    }, 2150);
  };

  return (
    <section id="experience" className={styles.expSection}>
      {/* Visual Wind & Speed Effects Overlay */}
      <div className={`${styles.windOverlay} ${isFlying ? styles.flying : ''}`}>
        {isFlying && (
          <>
            {WIND_STREAKS.map((streak, idx) => (
              <div
                key={idx}
                className={`${styles.windStreak} ${streak.phase === 1 ? styles.windPhase1 : styles.windPhase2}`}
                style={{
                  top: streak.top,
                  left: streak.left,
                  width: streak.width,
                  animationDelay: streak.delay,
                }}
              />
            ))}
            {/* Sonic Boom Rings */}
            <div
              className={`${styles.sonicShockwave} ${styles.sonicTakeoff}`}
              style={{ top: '65%', left: '25%' }}
            />
            <div
              className={`${styles.sonicShockwave} ${styles.sonicLanding}`}
              style={{ top: '65%', left: '25%' }}
            />
          </>
        )}
      </div>

      <div className={styles.expLayout}>
        {/* LEFT: Sticky panel with title and image */}
        <div className={styles.stickySide}>
          <div className={styles.stickyContent}>
            <p className="section-label">Career Journey</p>
            <h2 className="section-title">Work<br /><span>Experience</span></h2>
            <p className={styles.stickyDesc}>
              From Dhaka to Europe and the USA — 7+ years building great software across borders
            </p>

            {/* Stats */}
            <div className={styles.expStats}>
              {[
                { num: '4', label: 'Companies' },
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
            <div
              className={`${styles.supermanWrap} ${isFlying ? styles.isFlyingWrap : ''}`}
              onClick={handleSupermanClick}
              title="Click Superman to launch supersonic flight!"
              style={{ cursor: isFlying ? 'default' : 'pointer' }}
            >
              <Image
                src="/avatars/superman.png"
                alt="Atonu as Superman"
                width={350}
                height={350}
                className={`${styles.supermanImg} ${isFlying ? styles.supermanFlying : ''}`}
              />
              <div
                className={`${styles.supermanBadge} ${isFlying ? styles.supermanBadgeFlying : ''}`}
              >
                {isFlying ? '💨 Zooming!' : '⚡ Super Engineer!'}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Scrolling timeline */}
        <div className={styles.scrollSide}>
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
                        {/* {exp.current && <span className={styles.currentBadge}>● Current</span>} */}
                      </div>
                      <h3 className={styles.expRole}>{exp.role}</h3>
                      <div className={styles.expCompany}>
                        {exp.company}
                        {exp.location && <span className={styles.expLocation}> · {exp.location}</span>}
                      </div>
                    </div>
                    {exp.periods ? (
                      <div className={styles.expPeriodsCol}>
                        {exp.periods.map((p) => (
                          <div key={p} className={styles.expPeriod}>{p}</div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.expPeriod}>{exp.period}</div>
                    )}
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
      </div>
    </section>
  );
}
