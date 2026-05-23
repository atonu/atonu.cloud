'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto with pre-filled data
    const subject = `Portfolio Contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    window.open(`mailto:atonu.zahin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section"
      style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}
    >
      <div className="section-inner">
        <div className={styles.contactLayout}>
          {/* Info side */}
          <div className={styles.infoSide}>
            <p className="section-label">Get In Touch</p>
            <h2 className="section-title">Let&apos;s <span>Work Together</span></h2>
            <p className={styles.intro}>
              Whether you have a project in mind, want to discuss opportunities, 
              or just want to say hello — I&apos;d love to hear from you!
            </p>

            <div className={styles.contactLinks}>
              {[
                { icon: '✉', label: 'Email', value: 'atonu.zahin@gmail.com', href: 'mailto:atonu.zahin@gmail.com' },
                { icon: '📞', label: 'Phone', value: '+8801760605684', href: 'tel:+8801760605684' },
                { icon: '🔗', label: 'LinkedIn', value: 'ahmed-atonu-23ab08130', href: 'https://linkedin.com/in/ahmed-atonu-23ab08130' },
                { icon: '📍', label: 'Location', value: 'Dhaka, Bangladesh', href: null },
              ].map((link, i) => (
                <motion.div
                  key={i}
                  className={styles.contactLink}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={styles.contactLinkIcon}>{link.icon}</div>
                  <div>
                    <div className={styles.contactLinkLabel}>{link.label}</div>
                    {link.href ? (
                      <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                        className={styles.contactLinkValue}>
                        {link.value}
                      </a>
                    ) : (
                      <span className={styles.contactLinkValue}>{link.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Avatar */}
            <div className={styles.contactAvatar}>
              <Image
                src="/avatars/about.png"
                alt="Atonu Ahmed"
                width={180}
                height={200}
                className={styles.contactAvatarImg}
              />
              <div className={styles.contactSpeech}>
                Let&apos;s build something amazing together! 🚀
              </div>
            </div>
          </div>

          {/* Form side */}
          <motion.div
            className={styles.formSide}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`card ${styles.formCard}`}>
              <h3 className={styles.formTitle}>Send a Message</h3>
              {sent ? (
                <div className={styles.successMsg}>
                  <span>🎉</span>
                  <span>Message sent! I&apos;ll get back to you soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className={styles.input}
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      className={styles.input}
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>
                  <button id="contact-submit" type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Message ✉
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
