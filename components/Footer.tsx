import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>A</div>
          <div>
            <div className={styles.name}>Atonu Ahmed</div>
            <div className={styles.tagline}>Senior Software Engineer & Product Manager</div>
          </div>
        </div>

        <div className={styles.links}>
          {[
            { label: 'Home', href: '#home' },
            { label: 'About', href: '#about' },
            { label: 'Skills', href: '#skills' },
            { label: 'Experience', href: '#experience' },
            { label: 'Hobbies', href: '#hobbies' },
            { label: 'Contact', href: '#contact' },
          ].map(link => (
            <a key={link.label} href={link.href} className={styles.link}>{link.label}</a>
          ))}
        </div>

        <div className={styles.avatarFooter}>
          <Image
            src="/avatars/about.png"
            alt="Atonu Ahmed"
            width={80}
            height={90}
            className={styles.footerAvatar}
          />
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Atonu Ahmed. Built with ❤️ using Next.js & Three.js</span>
        <div className={styles.socialLinks}>
          <a href="https://linkedin.com/in/ahmed-atonu-23ab08130" target="_blank" rel="noreferrer"
            id="footer-linkedin" className={styles.socialLink}>🔗 LinkedIn</a>
          <a href="mailto:atonu.zahin@gmail.com" id="footer-email" className={styles.socialLink}>✉ Email</a>
        </div>
      </div>
    </footer>
  );
}
