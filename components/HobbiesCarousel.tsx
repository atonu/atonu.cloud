'use client';

import Image from 'next/image';
import styles from './HobbiesCarousel.module.css';

const hobbies = [
  { id: 'surfing',    title: 'Travelling',         subtitle: 'Riding waves of adventure',        img: '/avatars/hobby-surfing.png',    emoji: '🏄', color: '#06b6d4' },
  { id: 'safari',     title: 'Travelling',         subtitle: 'Safari life is wild (literally)',  img: '/avatars/hobby-safari.png',     emoji: '🦁', color: '#f59e0b' },
  { id: 'vlogging',   title: 'Vlogging',           subtitle: 'Capturing life, one frame at a time', img: '/avatars/hobby-vlogging.png',emoji: '🎥', color: '#ef4444' },
  { id: 'editing',    title: 'Video Editing',      subtitle: 'Telling stories through the edit',img: '/avatars/hobby-editing.png',    emoji: '🎬', color: '#8b5cf6' },
  { id: 'cycling',    title: 'Cycling',            subtitle: 'Full speed, fresh air, freedom',  img: '/avatars/hobby-cycling.png',    emoji: '🚴', color: '#22c55e' },
  { id: 'driving',    title: 'Driving',            subtitle: 'Head out, music up, road on',     img: '/avatars/hobby-driving.png',    emoji: '🚗', color: '#f97316' },
  { id: 'connecting', title: 'Connecting',         subtitle: 'Building bridges between people', img: '/avatars/hobby-connecting.png', emoji: '🤝', color: '#ec4899' },
  { id: 'mechanic',   title: 'Repairing Machines', subtitle: "If it's broken, I'll fix it",    img: '/avatars/hobby-mechanic.png',   emoji: '🔧', color: '#64748b' },
  { id: 'tea',        title: 'Preparing Tea',      subtitle: 'The sacred ritual of the perfect brew', img: '/avatars/hobby-tea.png',  emoji: '☕', color: '#a16207' },
];

// Duplicate for infinite loop
const doubled = [...hobbies, ...hobbies];

export default function HobbiesCarousel() {
  return (
    <section id="hobbies" className={styles.hobbiesSection}>
      <div className={styles.header}>
        <p className="section-label">Beyond The Code</p>
        <h2 className="section-title">When I&apos;m Not <span>Coding...</span></h2>
        <p className={styles.subtitle}>Life&apos;s too short to just write code. Here&apos;s how Atonu recharges.</p>
      </div>

      {/* Infinite scroll — row 1 (left to right) */}
      <div className={styles.marqueeWrapper}>
        <div className={`${styles.marqueeTrack} ${styles.marqueeLeft}`}>
          {doubled.map((h, i) => (
            <div key={`${h.id}-${i}`} id={`hobby-card-${h.id}-${i}`} className={styles.hobbyCard} data-hover>
              <div className={styles.hobbyImgWrap} style={{ borderColor: h.color }}>
                <Image
                  src={h.img}
                  alt={h.title}
                  width={220}
                  height={220}
                  className={styles.hobbyImg}
                />
              </div>
              <div className={styles.hobbyInfo}>
                <span className={styles.hobbyEmoji}>{h.emoji}</span>
                <span className={styles.hobbyTitle} style={{ color: h.color }}>{h.title}</span>
                <span className={styles.hobbySubtitle}>{h.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite scroll — row 2 (right to left) */}
      <div className={styles.marqueeWrapper}>
        <div className={`${styles.marqueeTrack} ${styles.marqueeRight}`}>
          {[...doubled].reverse().map((h, i) => (
            <div key={`r-${h.id}-${i}`} id={`hobby-card-rev-${h.id}-${i}`} className={styles.hobbyCard} data-hover>
              <div className={styles.hobbyImgWrap} style={{ borderColor: h.color }}>
                <Image
                  src={h.img}
                  alt={h.title}
                  width={220}
                  height={220}
                  className={styles.hobbyImg}
                />
              </div>
              <div className={styles.hobbyInfo}>
                <span className={styles.hobbyEmoji}>{h.emoji}</span>
                <span className={styles.hobbyTitle} style={{ color: h.color }}>{h.title}</span>
                <span className={styles.hobbySubtitle}>{h.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
