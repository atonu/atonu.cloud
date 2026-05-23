'use client';

import { useEffect } from 'react';

/**
 * Global scroll reveal observer:
 * - Watches all .reveal-text elements
 * - Adds .visible class when in viewport (text slides up from below)
 * - Also watches .card and section headings for fade-in
 */
export default function ScrollReveal() {
  useEffect(() => {
    // Text reveal via translate + opacity
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    // Fade + rise for cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.transitionDelay = `${i * 0.05}s`;
            el.classList.add('card-visible');
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const init = () => {
      document.querySelectorAll('.reveal-text').forEach(el => revealObserver.observe(el));
      document.querySelectorAll('.card').forEach(el => {
        el.classList.add('card-hidden');
        cardObserver.observe(el);
      });
    };

    // Small delay to let DOM render
    const timer = setTimeout(init, 300);

    return () => {
      clearTimeout(timer);
      revealObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return null;
}
