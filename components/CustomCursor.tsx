'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const hasMoved = useRef(false);
  const visibleRef = useRef(false); // Default false, only true in Hero

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
        
        // Glow follows instantly
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
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

    const checkHeroHover = (e: MouseEvent) => {
      const hero = document.getElementById('home');
      let isOverHero = false;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        // Check if mouse is vertically within the Hero section
        isOverHero = e.clientY >= rect.top && e.clientY <= rect.bottom;
      }

      const target = e.target as HTMLElement;
      const nav = document.querySelector('nav');
      const isOverNav = nav ? nav.contains(target) : false;

      if (isOverHero || isOverNav) {
        if (!visibleRef.current) {
          visibleRef.current = true;
          document.body.classList.add('hide-default-cursor');
          if (dotRef.current) dotRef.current.style.opacity = '1';
          if (ringRef.current) ringRef.current.style.opacity = '1';
          if (glowRef.current) glowRef.current.style.opacity = '1';
        }
      } else {
        if (visibleRef.current) {
          visibleRef.current = false;
          document.body.classList.remove('hide-default-cursor');
          if (dotRef.current) dotRef.current.style.opacity = '0';
          if (ringRef.current) ringRef.current.style.opacity = '0';
          if (glowRef.current) glowRef.current.style.opacity = '0';
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      moveCursor(e);
      checkHeroHover(e);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.body.classList.remove('hide-default-cursor');
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
