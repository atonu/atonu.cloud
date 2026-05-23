'use client';

import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const navItems = [
  { id: 'home', icon: '⌂', label: 'Home' },
  { id: 'about', icon: '◉', label: 'About' },
  { id: 'skills', icon: '◈', label: 'Skills' },
  { id: 'experience', icon: '◫', label: 'Experience' },
  { id: 'hobbies', icon: '✦', label: 'Hobbies' },
  { id: 'contact', icon: '✉', label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Init theme
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsDark(true);
    }

    // Scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      {/* Logo */}
      <div className={styles.logo} onClick={() => scrollTo('home')}>
        <span>A</span>
      </div>

      {/* Nav Items */}
      <ul className={styles.navList}>
        {navItems.map(({ id, icon, label }) => (
          <li key={id}>
            <button
              id={`nav-${id}`}
              className={`${styles.navItem} ${active === id ? styles.active : ''}`}
              onClick={() => scrollTo(id)}
              aria-label={label}
              title={label}
            >
              <span className={styles.navIcon}>{icon}</span>
              <span className={styles.navTooltip}>{label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Theme Toggle */}
      <button
        id="theme-toggle"
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle dark/light mode"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <span>{isDark ? '☀' : '☾'}</span>
      </button>
    </nav>
  );
}
