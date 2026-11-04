import styles from './AIOrchestration.module.css';

const agents = [
  { name: 'Planner', job: 'Breaks a goal into scoped tasks, constraints and acceptance checks.' },
  { name: 'Builder', job: 'Implements in parallel sub-agents, each with narrow context and tools.' },
  { name: 'Reviewer', job: 'Checks diffs against SOLID, design patterns and the project rules.' },
  { name: 'Tester', job: 'Writes and runs tests, reports failures back to the Builder.' },
];

const capabilities = [
  { t: 'Sub-agent orchestration', d: 'Claude Code and Gemini driven workflows: one orchestrator, specialist sub-agents, shared rules files, clear hand-offs.' },
  { t: 'AI workflow automation', d: 'Repeatable pipelines for delivery, documentation and client support, built so a team can reuse them.' },
  { t: 'RAG and knowledge bases', d: 'Enhanced the RAG knowledge base behind a production AI agent: retrieval quality, grounding and answer review.' },
  { t: 'Model adaptation', d: 'LLM-based localization, prompt and context design, evaluation sets, and adapting or training models where a prompt is not enough.' },
  { t: 'Guardrails', d: 'Humans approve architecture, data access and releases. Agents do the volume, people own the decisions.' },
];

export default function AIOrchestration() {
  return (
    <section id="ai" className={`section ${styles.ai}`}>
      <div className="section-inner">
        <h2 className="section-title">I orchestrate AI, <span>and stay accountable for it</span></h2>
        <p className="section-subtitle">
          I design the system around the model: who plans, who builds, who checks, and where a human must decide. That is what makes AI output safe to ship.
        </p>
        <figure className={styles.flow} aria-label="AI orchestration workflow">
          <div className={styles.node}><strong>You and the client</strong><span>Goal, context, constraints</span></div>
          <span className={styles.link} aria-hidden="true" />
          <div className={`${styles.node} ${styles.hub}`}><strong>Orchestrator</strong><span>Plans, routes, merges, keeps memory and rules</span></div>
          <span className={styles.link} aria-hidden="true" />
          <ol className={styles.agents}>
            {agents.map((a, i) => (
              <li key={a.name}><b>{i + 1}. {a.name}</b><span>{a.job}</span></li>
            ))}
          </ol>
          <span className={styles.link} aria-hidden="true" />
          <div className={styles.node}><strong>Human gate</strong><span>Review, approve, release</span></div>
          <figcaption>Failed checks loop back to the Builder. Nothing ships without the human gate.</figcaption>
        </figure>
        <dl className={styles.caps}>
          {capabilities.map((c) => (
            <div key={c.t}><dt>{c.t}</dt><dd>{c.d}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
