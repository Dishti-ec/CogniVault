import { motion } from 'motion/react';
import { StarField } from '../components/StarField';
import { RoomHeader } from '../components/RoomChrome';
import { useVault } from '../lib/vault-context';
import { QUESTIONS, TOPIC_MAP } from '../data/vault';

export function FutureQuestions() {
  const { enterTopic } = useVault();

  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-32">
      <StarField density={50} showNebula={false} />
      {/* mirror-floor reflection wash */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#150a26]/60 to-transparent" />

      <RoomHeader
        numeral="IX"
        title="Future Questions"
        subtitle="A hall that archives mysteries, not answers. Open questions inscribed on stone, glowing softly — waiting for answers that may never come."
      />

      <div className="relative z-10 mx-auto mt-16 max-w-4xl space-y-6 px-6">
        {QUESTIONS.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.9 }}
            className="relative rounded-xl border border-vault-gold/15 bg-[#120a22]/50 px-8 py-7 text-center backdrop-blur-sm"
          >
            <motion.p
              className="font-serif-display italic text-glow-gold"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.1rem)', color: 'var(--vault-light-gold)', lineHeight: 1.25 }}
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              “{q.text}”
            </motion.p>
            {q.related.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {q.related.map((id) => {
                  const t = TOPIC_MAP[id];
                  if (!t) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => enterTopic(id)}
                      className="rounded-full border border-vault-gold/25 px-3 py-1 font-mono-data text-[0.65rem] uppercase tracking-[0.15em] text-vault-gold transition-colors hover:bg-vault-gold/10"
                    >
                      ↳ {t.name}
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <p className="relative z-10 mt-12 text-center font-serif-display italic text-vault-mist/70">
        Over the years, questions may be annotated as perspective develops — or new ones inscribed beside them.
      </p>
    </div>
  );
}
