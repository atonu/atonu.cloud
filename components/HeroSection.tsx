'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';
import styles from './Hero.module.css';

// ── ROOM COMPONENTS ──────────────────────────────────────────────────────────

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <planeGeometry args={[8, 8]} />
      <meshStandardMaterial color="#c8b99a" roughness={0.8} />
    </mesh>
  );
}

function BackWall() {
  return (
    <mesh position={[0, 1, -3.5]} receiveShadow>
      <boxGeometry args={[8, 6, 0.1]} />
      <meshStandardMaterial color="#6b8cae" roughness={0.9} />
    </mesh>
  );
}

function SideWall() {
  return (
    <mesh position={[-3.5, 1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
      <boxGeometry args={[8, 6, 0.1]} />
      <meshStandardMaterial color="#5a7a9c" roughness={0.9} />
    </mesh>
  );
}

function Desk() {
  return (
    <group position={[0.3, -0.6, -0.5]}>
      {/* Desk top */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.12, 1.4]} />
        <meshStandardMaterial color="#a0785a" roughness={0.7} />
      </mesh>
      {/* Legs */}
      {[[-1.4, -0.6, 0.55], [1.4, -0.6, 0.55], [-1.4, -0.6, -0.55], [1.4, -0.6, -0.55]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.08, 1.2, 0.08]} />
          <meshStandardMaterial color="#7a5a3a" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Monitors() {
  return (
    <group position={[0.3, 0.2, -0.8]}>
      {/* Monitor 1 */}
      <group position={[-0.6, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.6, 0.04]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <boxGeometry args={[0.82, 0.52, 0.01]} />
          <meshStandardMaterial color="#0d1b2a" emissive="#1a3a5c" emissiveIntensity={0.6} />
        </mesh>
        {/* Code lines */}
        <mesh position={[-0.2, 0.1, 0.03]}>
          <boxGeometry args={[0.35, 0.02, 0.001]} />
          <meshStandardMaterial color="#4ec9b0" emissive="#4ec9b0" emissiveIntensity={1} />
        </mesh>
        <mesh position={[-0.1, 0.04, 0.03]}>
          <boxGeometry args={[0.28, 0.02, 0.001]} />
          <meshStandardMaterial color="#ce9178" emissive="#ce9178" emissiveIntensity={1} />
        </mesh>
        <mesh position={[-0.15, -0.02, 0.03]}>
          <boxGeometry args={[0.32, 0.02, 0.001]} />
          <meshStandardMaterial color="#569cd6" emissive="#569cd6" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0, -0.08, 0.03]}>
          <boxGeometry args={[0.22, 0.02, 0.001]} />
          <meshStandardMaterial color="#4ec9b0" emissive="#4ec9b0" emissiveIntensity={1} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.36, 0.05]}>
          <boxGeometry args={[0.06, 0.12, 0.06]} />
          <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Monitor 2 */}
      <group position={[0.65, 0.05, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.85, 0.55, 0.04]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <boxGeometry args={[0.77, 0.47, 0.01]} />
          <meshStandardMaterial color="#0d1b2a" emissive="#2a1a40" emissiveIntensity={0.5} />
        </mesh>
        {/* Chart circle */}
        <mesh position={[0.05, 0.05, 0.03]}>
          <circleGeometry args={[0.12, 32]} />
          <meshStandardMaterial color="#f5a623" emissive="#f5a623" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.05, 0.05, 0.035]}>
          <ringGeometry args={[0.07, 0.12, 32, 1, 0, Math.PI * 1.4]} />
          <meshStandardMaterial color="#4f6ef7" emissive="#4f6ef7" emissiveIntensity={1} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.34, 0.05]}>
          <boxGeometry args={[0.06, 0.12, 0.06]} />
          <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0, -0.28, 0.55]}>
        <boxGeometry args={[0.8, 0.04, 0.3]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.6} metalness={0.3} />
      </mesh>
    </group>
  );
}

function Chair() {
  return (
    <group position={[0.4, -0.85, 0.8]}>
      {/* Seat */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.1, 0.65]} />
        <meshStandardMaterial color="#3a6ea5" roughness={0.7} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0.45, -0.28]} castShadow>
        <boxGeometry args={[0.65, 0.9, 0.1]} />
        <meshStandardMaterial color="#2d5a8a" roughness={0.7} />
      </mesh>
      {/* Armrests */}
      <mesh position={[-0.35, 0.18, 0.05]}>
        <boxGeometry args={[0.06, 0.06, 0.5]} />
        <meshStandardMaterial color="#1a3a5e" roughness={0.6} />
      </mesh>
      <mesh position={[0.35, 0.18, 0.05]}>
        <boxGeometry args={[0.06, 0.06, 0.5]} />
        <meshStandardMaterial color="#1a3a5e" roughness={0.6} />
      </mesh>
      {/* Cylinder base */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.5, 12]} />
        <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.06, 5]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Bookshelf() {
  const colors = ['#f5a623', '#4f6ef7', '#22c55e', '#ef4444', '#a855f7'];
  return (
    <group position={[-2.5, 0.8, -3.3]}>
      {/* Shelf */}
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.08, 0.35]} />
        <meshStandardMaterial color="#8b6914" roughness={0.8} />
      </mesh>
      {/* Books */}
      {colors.map((color, i) => (
        <mesh key={i} position={[-0.6 + i * 0.28, 0.2 + (i % 2) * 0.05, 0]} castShadow>
          <boxGeometry args={[0.2, 0.38 + (i % 3) * 0.06, 0.28]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      ))}
      {/* "A" Book */}
      <mesh position={[0.62, 0.22, 0]} castShadow>
        <boxGeometry args={[0.22, 0.42, 0.28]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Plant() {
  return (
    <group position={[2.5, -0.8, -3.0]}>
      {/* Pot */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.16, 0.35, 16]} />
        <meshStandardMaterial color="#e8e8e0" roughness={0.9} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial color="#5a8a3a" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      {[0, 1.5, 3, 4.5].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.22, 0.45 + i * 0.02, Math.sin(angle) * 0.22]} rotation={[0.3, angle, 0.4]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#3a7a2a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function DeskLamp() {
  return (
    <group position={[-1.0, -0.2, -0.9]}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.06, 16]} />
        <meshStandardMaterial color="#c8a850" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Arm */}
      <mesh position={[0, 0.35, 0]} rotation={[0.5, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
        <meshStandardMaterial color="#c8a850" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Shade */}
      <mesh position={[0.12, 0.72, -0.15]} rotation={[0.8, 0, 0]}>
        <coneGeometry args={[0.18, 0.25, 16, 1, true]} />
        <meshStandardMaterial color="#f0c040" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Light */}
      <pointLight position={[0.12, 0.65, -0.15]} intensity={0.8} color="#ffdd88" distance={2.5} castShadow />
    </group>
  );
}

function CoffeeMug() {
  return (
    <group position={[0.9, -0.46, -0.5]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.07, 0.16, 16]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
      </mesh>
      <mesh position={[0.09, 0, 0]}>
        <torusGeometry args={[0.055, 0.018, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
      </mesh>
      {/* Coffee */}
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.072, 0.072, 0.01, 16]} />
        <meshStandardMaterial color="#3d1c02" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.4, -1.49, 0.5]} receiveShadow>
      <planeGeometry args={[3, 2.5]} />
      <meshStandardMaterial color="#9a7a5a" roughness={0.95} />
    </mesh>
  );
}

function Window() {
  return (
    <group position={[1.5, 1.2, -3.42]}>
      <mesh>
        <boxGeometry args={[1.4, 1.2, 0.06]} />
        <meshStandardMaterial color="#8b6914" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[1.24, 1.04]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.4} />
      </mesh>
      {/* Light beam */}
      <pointLight position={[0, 0, 1]} intensity={0.6} color="#fff5e0" distance={4} />
    </group>
  );
}

function Poster() {
  return (
    <group position={[-1.5, 1.4, -3.42]}>
      <mesh>
        <boxGeometry args={[0.85, 1.05, 0.03]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[0.75, 0.95]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>
    </group>
  );
}

function SmallPlant() {
  return (
    <group position={[1.2, -0.42, -0.7]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.1, 12]} />
        <meshStandardMaterial color="#a0785a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.12, 0]} castShadow>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#2a7a1a" roughness={0.9} />
      </mesh>
    </group>
  );
}

// ── SCENE WRAPPER WITH MOUSE PARALLAX ────────────────────────────────────────

function SceneContent({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useFrame(() => {
    if (mouseRef.current) {
      const targetX = mouseRef.current.x * 0.4;
      const targetY = mouseRef.current.y * 0.25;
      camera.position.x += (targetX - camera.position.x + 4) * 0.03 - 4 * 0.03;
      camera.position.y += (targetY - camera.position.y + 3.5) * 0.03 - 3.5 * 0.03;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// ── HERO SECTION ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section id="home" className={styles.hero}>
      {/* Left: Text content */}
      <div className={styles.heroContent}>
        <div className={styles.availableBadge}>
          <span className="glow-dot" />
          <span>Available for hire</span>
        </div>

        <p className={styles.greeting}>Hi, I&apos;m</p>
        <h1 className={styles.name}>
          <span>Atonu </span>
          <span className={styles.nameAccent}>Ahmed</span>
        </h1>
        <h2 className={styles.title}>
          Senior Software Engineer &amp;<br />
          Product Manager
        </h2>
        <p className={styles.description}>
          7+ years building full-stack SaaS products, microservices, and elegant digital experiences.
        </p>

        <div className={styles.ctaGroup}>
          <button
            id="view-projects-btn"
            className="btn-primary"
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects →
          </button>
          <a
            id="contact-btn"
            href="mailto:atonu.zahin@gmail.com"
            className="btn-secondary"
          >
            Let&apos;s Connect ↗
          </a>
        </div>
      </div>

      {/* Right: Three.js Canvas */}
      <div className={styles.heroCanvas}>
        <Canvas
          shadows
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <PerspectiveCamera makeDefault position={[4, 3.5, 5]} fov={45} />
          <SceneContent mouseRef={mouseRef} />

          {/* Lighting */}
          <ambientLight intensity={0.6} color="#fff5e0" />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
            color="#fffaf0"
          />
          <pointLight position={[-3, 3, 2]} intensity={0.4} color="#4f6ef7" />

          <Float floatIntensity={0.3} speed={1.5} rotationIntensity={0.1}>
            <group rotation={[0.1, -0.4, 0]}>
              <Floor />
              <Rug />
              <BackWall />
              <SideWall />
              <Desk />
              <Monitors />
              <Chair />
              <Bookshelf />
              <Plant />
              <DeskLamp />
              <CoffeeMug />
              <Window />
              <Poster />
              <SmallPlant />
            </group>
          </Float>

          {/* Avatar positioned via DOM overlay below */}
        </Canvas>

        {/* Avatar overlay on canvas */}
        <div className={styles.avatarOverlay}>
          <Image
            src="/avatars/hero.png"
            alt="Atonu Ahmed cartoon avatar at desk"
            width={260}
            height={260}
            className={styles.avatarImg}
            priority
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        {[
          { icon: '◫', value: '7+', label: 'Years Experience', sub: 'Building scalable SaaS products since 2018' },
          { icon: '◈', value: 'Full-stack &', label: 'Microservices', sub: 'Architecting robust systems that scale and perform' },
          { icon: '◉', value: 'SELISE', label: 'Group AG', sub: 'Senior Software Engineer & Product Manager' },
          { icon: '</>', value: 'TypeScript • .NET', label: 'Angular • React', sub: 'Modern stack for building fast, reliable applications' },
        ].map((stat, i) => (
          <div key={i} id={`stat-${i}`} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statSub}>{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
