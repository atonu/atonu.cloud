'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Three layers of particles at different depths
    type Particle = { x: number; y: number; r: number; speed: number; opacity: number; layer: number };
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 180;

    const randomParticle = (): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.6 + 0.2,
      layer: Math.floor(Math.random() * 3), // 0=far, 1=mid, 2=near
    });

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(randomParticle());

    const layerSpeed = [0.3, 0.6, 1.0];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = (mouseRef.current.x / W - 0.5) * 2;
      const my = (mouseRef.current.y / H - 0.5) * 2;

      particles.forEach(p => {
        const ls = layerSpeed[p.layer];
        const px = p.x + mx * 18 * ls;
        const py = p.y + my * 12 * ls;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 166, 35, ${p.opacity * ls * 0.7})`;
        ctx.shadowBlur = p.r * 3;
        ctx.shadowColor = `rgba(245, 166, 35, ${p.opacity * 0.4})`;
        ctx.fill();

        // Also draw blue accent particles for variety
        if (p.layer === 0) {
          ctx.beginPath();
          ctx.arc(px + 3, py + 3, p.r * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(79, 110, 247, ${p.opacity * 0.4})`;
          ctx.shadowBlur = p.r * 2;
          ctx.shadowColor = `rgba(79, 110, 247, 0.3)`;
          ctx.fill();
        }

        ctx.shadowBlur = 0;

        // Drift upward slowly
        p.y -= p.speed;
        if (p.y < -5) {
          p.y = H + 5;
          p.x = Math.random() * W;
        }
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('resize', onResize);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  );
}
