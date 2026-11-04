'use client';

import { motion, useReducedMotion } from 'framer-motion';
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
  const reduceMotion = useReducedMotion();

  return (
    <section id="ai" className={`section ${styles.ai}`}>
      <div className="section-inner">
        <motion.h2
          className="section-title"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          I orchestrate AI, <span>and stay accountable for it</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          I design the system around the model: who plans, who builds, who checks, and where a human must decide. That is what makes AI output safe to ship.
        </motion.p>
        <figure className={styles.flow} aria-label="AI orchestration workflow">
          <motion.div className={styles.node} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <strong>You and the client</strong><span>Goal, context, constraints</span>
          </motion.div>
          <span className={styles.link} aria-hidden="true" />
          <motion.div className={`${styles.node} ${styles.hub}`} initial={reduceMotion ? { opacity: 0, scale: 0.94 } : { opacity: 0, y: 32, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}>
            <strong>Orchestrator</strong><span>Plans, routes, merges, keeps memory and rules</span>
          </motion.div>
          <span className={styles.link} aria-hidden="true" />
          <ol className={styles.agents}>
            {agents.map((a, i) => (
              <motion.li key={a.name} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: i % 2 === 0 ? 32 : -32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: i * 0.07 }}>
                <b>{i + 1}. {a.name}</b><span>{a.job}</span>
              </motion.li>
            ))}
          </ol>
          <span className={styles.link} aria-hidden="true" />
          <motion.div className={styles.node} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <strong>Human gate</strong><span>Review, approve, release</span>
          </motion.div>
          <figcaption>Failed checks loop back to the Builder. Nothing ships without the human gate.</figcaption>
        </figure>
        <dl className={styles.caps}>
          {capabilities.map((c, i) => (
            <motion.div key={c.t} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: i * 0.06 }}>
              <dt>{c.t}</dt><dd>{c.d}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
