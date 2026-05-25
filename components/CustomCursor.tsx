'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hasMoved = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      hasMoved.current = true;
    };

    const animate = () => {
      if (visibleRef.current && hasMoved.current) {
        // Dot follows instantly
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
        }
        // Ring follows with lerp
        const dx = pos.current.x - ringPos.current.x;
        const dy = pos.current.y - ringPos.current.y;
        // Only update if there's meaningful movement
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          ringPos.current.x += dx * 0.12;
          ringPos.current.y += dy * 0.12;
          if (ringRef.current) {
            ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
          }
        } else {
          hasMoved.current = false;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest?.('a, button, [data-hover]')) {
        ringRef.current?.classList.add('hovered');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest?.('a, button, [data-hover]')) {
        ringRef.current?.classList.remove('hovered');
      }
    };

    // Throttled gradient update — only update every 2nd frame worth of movement
    let gradientRaf: number | null = null;
    const updateGradient = (e: MouseEvent) => {
      if (gradientRaf) return;
      gradientRaf = requestAnimationFrame(() => {
        if (glowRef.current) {
          const xPct = `${(e.clientX / window.innerWidth) * 100}%`;
          const yPct = `${(e.clientY / window.innerHeight) * 100}%`;
          glowRef.current.style.setProperty('--mouse-x', xPct);
          glowRef.current.style.setProperty('--mouse-y', yPct);
        }
        gradientRaf = null;
      });
    };

    const onVisibilityChange = () => {
      visibleRef.current = !document.hidden;
    };

    document.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mousemove', updateGradient, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousemove', updateGradient);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (gradientRaf) cancelAnimationFrame(gradientRaf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-gradient" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
