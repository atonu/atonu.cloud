'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './Impact.module.css';

const metrics = [
  { n: '70%', t: 'sales increase', d: 'Scaled and stabilized the core of a SaaS product as lead developer, so growth could happen safely.' },
  { n: '08+', t: 'years in production', d: 'SaaS, enterprise, blockchain and AI platforms. Not demos.' },
  { n: '02', t: 'promotions at SELISE', d: 'Engineer to Senior Engineer, and into Product Manager / Operations Manager.' },
  { n: '04', t: 'countries delivered for', d: 'Switzerland, Germany, USA and Bangladesh, mostly remote across time zones.' },
];

const principles = [
  { t: 'Trust and reliability', d: 'Clients kept me on their roadmap for years: promoted twice, and recommended by a client (2023) and a senior engineer (2024).' },
  { t: 'Ownership, end to end', d: 'Forward-deployed: I sit with the client, understand the business problem, and own delivery until it runs in production.' },
  { t: 'Client-facing clarity', d: 'Technical manager and client-facing developer on a blockchain SaaS. I translate between business goals and engineering.' },
  { t: 'Team leadership', d: 'Front-end lead for key product lines. I raise the bar through code review, version discipline and shared design systems.' },
  { t: 'Quick thinking under ambiguity', d: 'I make the call with partial information, state the trade-off, and adjust fast when reality disagrees.' },
  { t: 'Learning speed and AI adaptability', d: 'Moved from Angular/.NET to Go, LLM localization, RAG and agent workflows by shipping, not by certificate.' },
];

export default function Impact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="impact" className={`section ${styles.impact}`}>
      <div className="section-inner">
        <motion.h2
          className="section-title"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          Engineering that moves <span>the business</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          Anyone can list a stack. What matters is whether the work lands, people can rely on you, and you grow as the tools change.
        </motion.p>
        <ul className={styles.metrics}>
          {metrics.map((m, i) => (
            <motion.li
              key={m.t}
              className={styles.metric}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: i % 2 === 0 ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <span className={styles.num}>{m.n}</span>
              <span className={styles.metricBody}>
                <strong>{m.t}</strong>
                <span>{m.d}</span>
              </span>
            </motion.li>
          ))}
        </ul>
        <motion.h3 className={styles.sub} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          How I work with people
        </motion.h3>
        <dl className={styles.principles}>
          {principles.map((p, i) => (
            <motion.div
              key={p.t}
              className={styles.principle}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: i < 3 ? 36 : -36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
            >
              <dt>{p.t}</dt>
              <dd>{p.d}</dd>
            </motion.div>
          ))}
        </dl>
        <p className={styles.partner}>
          <strong>Founders and business owners:</strong> I am open to partnering on ventures, not just taking tickets. I bring product thinking, delivery ownership and an AI-native way of building.
        </p>
      </div>
    </section>
  );
}
