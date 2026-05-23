'use client';

import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Home, User, Briefcase, Code2, Sparkles, Mail, Box } from 'lucide-react';

const navItems = [
  { id: 'home',       Icon: Home,      label: 'Home' },
  { id: 'about',      Icon: User,      label: 'About' },
  { id: 'skills',     Icon: Code2,     label: 'Skills' },
  { id: 'experience', Icon: Briefcase, label: 'Experience' },
  { id: 'hobbies',    Icon: Sparkles,  label: 'Hobbies' },
  { id: 'contact',    Icon: Mail,      label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      setIsLight(true);
    }

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
    const next = !isLight;
    setIsLight(next);
    document.documentElement.setAttribute('data-theme', next ? 'light' : '');
    localStorage.setItem('theme', next ? 'light' : 'dark');
  };

  const scrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      {/* Logo */}
      <button className={styles.logo} onClick={() => scrollTo('home')} id="nav-logo" aria-label="Go to top">
        <span>A</span>
      </button>

      {/* Active accent line */}
      <div className={styles.activeAccent} />

      {/* Nav Items */}
      <ul className={styles.navList}>
        {navItems.map(({ id, Icon, label }) => (
          <li key={id}>
            <button
              id={`nav-${id}`}
              className={`${styles.navItem} ${active === id ? styles.active : ''}`}
              onClick={() => scrollTo(id)}
              aria-label={label}
              title={label}
            >
              <Icon size={20} strokeWidth={1.8} />
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
        aria-label="Toggle theme"
        title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      >
        {isLight ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>
    </nav>
  );
}
