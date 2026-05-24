'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${pos.current.x}px - 50%), calc(${pos.current.y}px - 50%), 0)`;
      }
      // Ring follows with lerp (smooth lag)
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%), 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleHoverIn = () => {
      ringRef.current?.classList.add('hovered');
    };
    const handleHoverOut = () => {
      ringRef.current?.classList.remove('hovered');
    };

    // Also update the gradient CSS vars
    const updateGradient = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousemove', updateGradient);

    // Add hover detection to all interactive elements
    const interactables = document.querySelectorAll('a, button, [data-hover]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    rafRef.current = requestAnimationFrame(animate);

    // Re-query on DOM changes
    const observer = new MutationObserver(() => {
      const newInteractables = document.querySelectorAll('a, button, [data-hover]');
      newInteractables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverIn);
        el.removeEventListener('mouseleave', handleHoverOut);
        el.addEventListener('mouseenter', handleHoverIn);
        el.addEventListener('mouseleave', handleHoverOut);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousemove', updateGradient);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
