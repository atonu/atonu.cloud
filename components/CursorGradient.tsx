'use client';

import { useEffect, useRef } from 'react';

export default function CursorGradient() {
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: 50, y: 50 });
  const targetRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    };

    const animate = () => {
      // Smooth lerp
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.08;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.08;

      document.documentElement.style.setProperty('--mouse-x', `${posRef.current.x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${posRef.current.y}%`);

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div className="cursor-gradient" aria-hidden="true" />;
}
