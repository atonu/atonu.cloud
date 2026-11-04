import styles from './Projects.module.css';

const cases = [
  { title: 'Scaling a SaaS core for a 70% sales increase', role: 'Lead developer', problem: 'Demand was growing faster than the core system could safely handle. Growth depended on it staying stable.', approach: ['Profiled the core system and ranked bottlenecks by business risk', 'Stabilized first, then scaled the hot paths and data-heavy flows', 'Kept releases small with code review and strict version control'], decision: 'Fix reliability before adding features, so sales could grow without incidents.', outcome: 'The scaled system supported a 70% sales increase.', stack: ['Angular', '.NET', 'Azure', 'CI/CD'] },
  { title: 'Blockchain SaaS with smart contracts', role: 'Technical manager, client-facing developer, front-end lead', problem: 'A client needed verifiable, tamper-resistant records inside a usable SaaS product.', approach: ['Defined with the client what lives on-chain and what stays off-chain', 'Designed the front-end architecture and shared component system', 'Ran planning, estimates and demos directly with the client'], decision: 'Keep the chain for trust-critical state and use conventional services for everything else.', outcome: 'Delivered a client-facing platform with smart contracts while leading the team and the relationship.', stack: ['TypeScript', 'Angular', 'Smart contracts', 'Microservices'] },
  { title: 'Telemetry migration to cloud storage', role: 'Lead engineer', problem: 'High-volume telemetry sat in the primary database and drove up cost and load.', approach: ['Separated hot operational data from cold telemetry', 'Migrated to cloud object storage without breaking reads', 'Verified integrity before retiring old data'], decision: 'Move data by access pattern, not by table, to cut cost without touching user experience.', outcome: 'Significantly reduced storage and database cost.', stack: ['PostgreSQL', 'Cloud storage', 'AWS S3', 'Docker'] },
  { title: 'AI agent knowledge base and LLM localization', role: 'Engineer and product manager (SELISE Signature)', problem: 'An AI agent gave inconsistent answers, and the product needed accurate localization across languages.', approach: ['Improved the RAG pipeline: chunking, retrieval and grounding', 'Built LLM-based localization with review loops for quality', 'Defined success checks with the business, not only the model'], decision: 'Treat evaluation as a product requirement, so quality is measurable and not a feeling.', outcome: 'A more reliable knowledge base for the agent and LLM-powered localization in the product.', stack: ['RAG', 'LLMs', 'Node.js', 'Python'] },
  { title: 'ERP as a SaaS, AI-native', role: 'Senior ERP and AI Integration Engineer, forward deployed', problem: 'Clients need ERP that fits how they really work, connected to their CRM, with AI built in.', approach: ['Embed with the client and map real workflows before designing', 'Multi-tenant SaaS core with CRM integration points', 'AI features designed in from the start, with human approval steps'], decision: 'Own delivery end to end, so the client has one accountable engineer.', outcome: 'In progress at Remoteintegrity (2026 to present).', stack: ['TypeScript', 'ERP', 'CRM integration', 'AI agents'] },
];

const products = [
  { name: 'Edgetech', link: 'https://edgetech.com.bd/', desc: 'Edge intelligence for real-time sensor processing and control.' },
  { name: 'BI-Lite', link: 'https://lit-bi.vercel.app/', desc: 'Lightweight business intelligence engine.' },
  { name: 'Vellora', link: 'https://vellora-fe.vercel.app/', desc: 'Conversational AI interface.' },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <h2 className="section-title">Work, told as <span>decisions</span></h2>
        <p className="section-subtitle">Each case shows the problem, how I planned and designed it, the trade-off I chose, and what changed.</p>
        {cases.map((c) => (
          <article key={c.title} className={styles.case}>
            <header><h3>{c.title}</h3><p className={styles.role}>{c.role}</p></header>
            <div className={styles.body}>
              <p><b>Problem.</b> {c.problem}</p>
              <ol className={styles.steps}>{c.approach.map((s) => <li key={s}>{s}</li>)}</ol>
              <p><b>Key decision.</b> {c.decision}</p>
              <p className={styles.outcome}><b>Outcome.</b> {c.outcome}</p>
              <p className={styles.stack}>{c.stack.join(', ')}</p>
            </div>
          </article>
        ))}
        <h3 className={styles.sub}>Products I built and run</h3>
        <ul className={styles.products}>
          {products.map((p) => (
            <li key={p.name}><a href={p.link} target="_blank" rel="noopener noreferrer"><b>{p.name}</b><span>{p.desc}</span></a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
