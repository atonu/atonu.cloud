'use client';

import { useRef, useState, useEffect, ReactNode, ComponentType } from 'react';
import styles from './LazySection.module.css';

interface LazySectionProps {
  /** The component to render once in view */
  children: ReactNode;
  /** Minimum height for the skeleton placeholder */
  minHeight?: string;
  /** Section id for scroll navigation (passed through to the wrapper) */
  id?: string;
  /** Extra margin around the viewport trigger (load before fully visible) */
  rootMargin?: string;
}

export default function LazySection({
  children,
  minHeight = '80vh',
  id,
  rootMargin = '200px 0px',
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} id={id} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? (
        children
      ) : (
        <div className={styles.skeleton} style={{ minHeight }}>
          <div className={styles.skeletonInner}>
            <div className={styles.shimmerLine} style={{ width: '35%', height: 12 }} />
            <div className={styles.shimmerLine} style={{ width: '55%', height: 28 }} />
            <div className={styles.shimmerLine} style={{ width: '45%', height: 14 }} />
            <div className={styles.shimmerBlock} />
          </div>
        </div>
      )}
    </div>
  );
}
