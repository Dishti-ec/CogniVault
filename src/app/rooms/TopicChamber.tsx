import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ScrollText, BookOpen, HelpCircle, Sparkles } from 'lucide-react';
import { StarField } from '../components/StarField';
import { useVault } from '../lib/vault-context';
import { TOPIC_MAP, CLUSTERS, STATUS_META, QUESTIONS } from '../data/vault';

export function TopicChamber() {
  const { activeTopicId, enterTopic, goto } = useVault();
  const [note, setNote] = useState('');
  const topic = activeTopicId ? TOPIC_MAP[activeTopicId] : null;

  if (!topic) {
    return (
      <div className="grid h-screen place-items-center">
        <StarField />
        <button
          onClick={() => goto('galaxy')}
          className="relative z-10 rounded-full border border-vault-gold/40 px-6 py-3 font-display text-sm uppercase tracking-[0.3em] text-vault-gold"
        >
          No chamber selected — return to the Galaxy
        </button>
      </div>
    );
  }

  const cluster = CLUSTERS[topic.cluster];
  const accent = cluster.color === '#3a3a5c' ? '#8a8aff' : cluster.color;
  const status = STATUS_META[topic.status];
  const related = QUESTIONS.filter((q) => q.related.includes(topic.id));

  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-32">
      <StarField density={70} tint={cluster.glow} />
      {/* chamber atmosphere wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(80% 60% at 50% 30%, ${accent}22, transparent 70%)` }}
      />

      <motion.div
        key={topic.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-5xl px-6 pt-24"
      >
        {/* header + central artifact */}
        <div className="text-center">
          <p className="font-display text-xs uppercase tracking-[0.4em]" style={{ color: accent }}>
            {cluster.wing} · {cluster.name}
          </p>

          <div className="relative mx-auto my-8 grid h-44 w-44 place-items-center">
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: accent }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="relative grid h-32 w-32 place-items-center rounded-full border-2"
              style={{ borderColor: accent }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={40} style={{ color: 'var(--vault-light-gold)' }} />
            </motion.div>
          </div>

          <h1
            className="font-display text-glow-gold"
            style={{ fontSize: 'clamp(1.8rem,4.5vw,3.2rem)', color: 'var(--vault-light-gold)', lineHeight: 1.1 }}
          >
            {topic.name}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4 font-mono-data text-[0.7rem] text-vault-mist">
            <span style={{ color: status.color }}>{status.dot} {status.label}</span>
            <span>·</span>
            <span>Explored {topic.year}</span>
            <span>·</span>
            <span>{topic.connections.length} connections</span>
          </div>
        </div>

        {/* panels */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Panel accent={accent} icon={<ScrollText size={16} />} title="Overview">
            <p className="font-serif-display text-vault-white/90" style={{ fontSize: '1.15rem', lineHeight: 1.5 }}>
              {topic.overview}
            </p>
            <p className="mt-4 font-serif-display italic text-vault-mist" style={{ fontSize: '1.05rem' }}>
              <span className="not-italic font-display text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: accent }}>
                Why I chose it —{' '}
              </span>
              {topic.whyChosen}
            </p>
          </Panel>

          <Panel accent={accent} icon={<Sparkles size={16} />} title="Key Insights">
            <ul className="space-y-3">
              {topic.insights.map((ins, i) => (
                <li key={i} className="flex gap-3 text-vault-white/85" style={{ fontSize: '0.95rem' }}>
                  <span className="font-mono-data text-[0.7rem]" style={{ color: accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{ins}</span>
                </li>
              ))}
            </ul>
          </Panel>

          {/* annotation space */}
          <Panel accent={accent} icon={<BookOpen size={16} />} title="Personal Annotations">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Margin whispers — fear, power, sacred, forbidden… write like you're talking to the source."
              className="h-32 w-full resize-none rounded-lg border border-vault-gold/15 bg-vault-black/40 p-3 font-serif-display text-vault-white placeholder:text-vault-mist/40 focus:border-vault-gold/40 focus:outline-none"
              style={{ fontSize: '1.05rem' }}
            />
          </Panel>

          {/* future questions portal */}
          <Panel accent={accent} icon={<HelpCircle size={16} />} title="Future Questions Portal">
            {related.length ? (
              related.map((q) => (
                <button
                  key={q.id}
                  onClick={() => goto('questions')}
                  className="mb-2 block w-full text-left font-serif-display italic text-vault-light-gold transition-colors hover:text-vault-gold"
                  style={{ fontSize: '1.1rem' }}
                >
                  “{q.text}”
                </button>
              ))
            ) : (
              <p className="font-serif-display italic text-vault-mist" style={{ fontSize: '1.05rem' }}>
                What does this topic suggest people were afraid of losing — or finding? Add it to the Hall of
                Future Questions.
              </p>
            )}
            <button
              onClick={() => goto('questions')}
              className="mt-3 font-display text-[0.65rem] uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              Enter the Hall of Questions →
            </button>
          </Panel>
        </div>

        {/* connections corridor */}
        <div className="mt-12">
          <h2 className="text-center font-display text-vault-gold" style={{ fontSize: '1rem', letterSpacing: '0.3em' }}>
            CONNECTIONS CORRIDOR
          </h2>
          <p className="mb-6 mt-1 text-center font-serif-display italic text-vault-mist">
            Doorways to related chambers in the {cluster.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {topic.connections.map((cid) => {
              const c = TOPIC_MAP[cid];
              if (!c) return null;
              return (
                <button
                  key={cid}
                  onClick={() => enterTopic(cid)}
                  className="group flex items-center gap-2 rounded-full border border-vault-gold/25 bg-vault-black/50 px-5 py-2.5 backdrop-blur-sm transition-all hover:-translate-y-0.5"
                  style={{ borderColor: `${accent}55` }}
                >
                  <span className="font-serif-display text-vault-white" style={{ fontSize: '1.05rem' }}>
                    {c.name}
                  </span>
                  <ArrowRight size={14} className="text-vault-gold transition-transform group-hover:translate-x-1" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => goto('archive')}
            className="rounded-full border border-vault-gold/40 bg-vault-gold/10 px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-vault-light-gold"
          >
            Open Archive Entry
          </button>
          <button
            onClick={() => goto('galaxy')}
            className="rounded-full border border-vault-gold/20 px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-vault-mist hover:text-vault-white"
          >
            Back to Galaxy
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Panel({
  accent,
  icon,
  title,
  children,
}: {
  accent: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-vault-gold/15 bg-vault-black/40 p-6 backdrop-blur-md"
      style={{ boxShadow: `inset 0 0 40px -30px ${accent}` }}
    >
      <div className="mb-4 flex items-center gap-2 font-display text-[0.65rem] uppercase tracking-[0.25em]" style={{ color: accent }}>
        {icon} {title}
      </div>
      {children}
    </motion.div>
  );
}
