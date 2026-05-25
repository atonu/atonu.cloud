'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Reduced particle count for performance
    type Particle = { x: number; y: number; r: number; speed: number; opacity: number; layer: number };
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 80; // Down from 180

    const randomParticle = (): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.6 + 0.2,
      layer: Math.floor(Math.random() * 3),
    });

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(randomParticle());

    const layerSpeed = [0.3, 0.6, 1.0];

    const draw = () => {
      if (!visibleRef.current) {
        frameRef.current = requestAnimationFrame(draw);
        return; // Skip rendering when tab is hidden
      }

      ctx.clearRect(0, 0, W, H);

      const mx = (mouseRef.current.x / W - 0.5) * 2;
      const my = (mouseRef.current.y / H - 0.5) * 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const ls = layerSpeed[p.layer];
        const px = p.x + mx * 18 * ls;
        const py = p.y + my * 12 * ls;

        // Single draw per particle (removed glow + blue accent = 3 fewer draws per particle)
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 166, 35, ${p.opacity * ls * 0.7})`;
        ctx.fill();

        // Drift upward slowly
        p.y -= p.speed;
        if (p.y < -5) {
          p.y = H + 5;
          p.x = Math.random() * W;
        }
      }

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

    // Pause when tab is hidden
    const onVisibilityChange = () => {
      visibleRef.current = !document.hidden;
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
