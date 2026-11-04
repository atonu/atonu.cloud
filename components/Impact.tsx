import styles from './Impact.module.css';

const metrics = [
  { n: '70%', t: 'sales increase', d: 'Scaled and stabilized the core of a SaaS product as lead developer, so growth could happen safely.' },
  { n: '2', t: 'promotions at SELISE', d: 'Engineer to Senior Engineer, and into Product Manager / Operations Manager.' },
  { n: '4', t: 'countries delivered for', d: 'Switzerland, Germany, USA and Bangladesh, mostly remote across time zones.' },
  { n: '7+', t: 'years in production', d: 'SaaS, enterprise, blockchain and AI platforms. Not demos.' },
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
  return (
    <section id="impact" className={`section ${styles.impact}`}>
      <div className="section-inner">
        <h2 className="section-title">Engineering that moves <span>the business</span></h2>
        <p className="section-subtitle">
          Anyone can list a stack. What matters is whether the work lands, people can rely on you, and you grow as the tools change.
        </p>
        <ul className={styles.metrics}>
          {metrics.map((m) => (
            <li key={m.t} className={styles.metric}>
              <span className={styles.num}>{m.n}</span>
              <span className={styles.metricBody}>
                <strong>{m.t}</strong>
                <span>{m.d}</span>
              </span>
            </li>
          ))}
        </ul>
        <h3 className={styles.sub}>How I work with people</h3>
        <dl className={styles.principles}>
          {principles.map((p) => (
            <div key={p.t} className={styles.principle}>
              <dt>{p.t}</dt>
              <dd>{p.d}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.partner}>
          <strong>Founders and business owners:</strong> I am open to partnering on ventures, not just taking tickets. I bring product thinking, delivery ownership and an AI-native way of building.
        </p>
      </div>
    </section>
  );
}
