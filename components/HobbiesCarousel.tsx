'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import styles from './HobbiesCarousel.module.css';

const hobbies = [
  {
    id: 'surfing',
    title: 'Travelling',
    subtitle: 'Riding the waves of adventure',
    img: '/avatars/hobby-surfing.png',
    emoji: '🏄',
    color: '#06b6d4',
    bg: 'linear-gradient(135deg, #0891b2, #0e7490)',
  },
  {
    id: 'safari',
    title: 'Travelling',
    subtitle: 'Safari life is wild (literally)',
    img: '/avatars/hobby-safari.png',
    emoji: '🦁',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, #d97706, #b45309)',
  },
  {
    id: 'vlogging',
    title: 'Vlogging',
    subtitle: 'Capturing life, one frame at a time',
    img: '/avatars/hobby-vlogging.png',
    emoji: '🎥',
    color: '#ef4444',
    bg: 'linear-gradient(135deg, #dc2626, #b91c1c)',
  },
  {
    id: 'editing',
    title: 'Video Editing',
    subtitle: 'Telling stories through the edit',
    img: '/avatars/hobby-editing.png',
    emoji: '🎬',
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
  },
  {
    id: 'cycling',
    title: 'Cycling',
    subtitle: 'Full speed, fresh air, freedom',
    img: '/avatars/hobby-cycling.png',
    emoji: '🚴',
    color: '#22c55e',
    bg: 'linear-gradient(135deg, #16a34a, #15803d)',
  },
  {
    id: 'driving',
    title: 'Driving',
    subtitle: 'Head out, music up, road on',
    img: '/avatars/hobby-driving.png',
    emoji: '🚗',
    color: '#f97316',
    bg: 'linear-gradient(135deg, #ea580c, #c2410c)',
  },
  {
    id: 'connecting',
    title: 'Connecting',
    subtitle: 'Building bridges between people',
    img: '/avatars/hobby-connecting.png',
    emoji: '🤝',
    color: '#ec4899',
    bg: 'linear-gradient(135deg, #db2777, #be185d)',
  },
  {
    id: 'mechanic',
    title: 'Repairing Machines',
    subtitle: 'If it\'s broken, I\'ll fix it',
    img: '/avatars/hobby-mechanic.png',
    emoji: '🔧',
    color: '#64748b',
    bg: 'linear-gradient(135deg, #475569, #334155)',
  },
  {
    id: 'tea',
    title: 'Preparing Tea',
    subtitle: 'The sacred ritual of the perfect brew',
    img: '/avatars/hobby-tea.png',
    emoji: '☕',
    color: '#a16207',
    bg: 'linear-gradient(135deg, #92400e, #78350f)',
  },
];

export default function HobbiesCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % hobbies.length);
    }, 3500);
  };

  useEffect(() => {
    if (!isPaused) startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused]);

  const goTo = (i: number) => {
    setActive(i);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const hobby = hobbies[active];

  return (
    <section id="hobbies" className="section"
      style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}
    >
      <div className="section-inner">
        <p className="section-label">Beyond The Code</p>
        <h2 className="section-title">When I&apos;m Not <span>Coding...</span></h2>
        <p className="section-subtitle">Life&apos;s too short to just write code. Here&apos;s how Atonu recharges.</p>

        <div className={styles.carousel}>
          {/* Main display */}
          <div
            className={styles.mainCard}
            style={{ background: hobby.bg }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Avatar */}
            <div className={styles.mainAvatar}>
              <Image
                key={hobby.id}
                src={hobby.img}
                alt={`Atonu ${hobby.title}`}
                width={340}
                height={380}
                className={styles.mainAvatarImg}
              />
            </div>

            {/* Info */}
            <div className={styles.mainInfo}>
              <div className={styles.mainEmoji}>{hobby.emoji}</div>
              <h3 className={styles.mainTitle}>{hobby.title}</h3>
              <p className={styles.mainSubtitle}>{hobby.subtitle}</p>
              <div className={styles.slideIndicator}>
                {active + 1} / {hobbies.length}
              </div>
            </div>

            {/* Nav arrows */}
            <button
              id="hobby-prev"
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={() => goTo((active - 1 + hobbies.length) % hobbies.length)}
              aria-label="Previous hobby"
            >‹</button>
            <button
              id="hobby-next"
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={() => goTo((active + 1) % hobbies.length)}
              aria-label="Next hobby"
            >›</button>
          </div>

          {/* Thumbnails */}
          <div className={styles.thumbs}>
            {hobbies.map((h, i) => (
              <button
                key={h.id}
                id={`hobby-thumb-${h.id}`}
                className={`${styles.thumb} ${active === i ? styles.thumbActive : ''}`}
                onClick={() => goTo(i)}
                style={{ '--thumb-color': h.color } as React.CSSProperties}
                aria-label={`Go to ${h.title}`}
              >
                <span className={styles.thumbEmoji}>{h.emoji}</span>
                <span className={styles.thumbLabel}>{h.title}</span>
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((active + 1) / hobbies.length) * 100}%`,
                background: hobby.color,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
