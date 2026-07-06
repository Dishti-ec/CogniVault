import { useState } from 'react';
import { motion } from 'motion/react';
import { StarField } from '../components/StarField';
import { RoomHeader } from '../components/RoomChrome';
import { useVault } from '../lib/vault-context';
import { TIMELINE, TOPIC_MAP, CLUSTERS } from '../data/vault';

export function Timeline() {
  const { enterTopic } = useVault();
  const [openYear, setOpenYear] = useState<number>(TIMELINE[0]?.year ?? 2024);

  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-32">
      <StarField density={70} />
      <RoomHeader
        numeral="VII"
        title="Timeline of Discovery"
        subtitle="Not a biography — an intellectual autobiography. A golden thread unrolling through the years, each node a season of curiosity."
      />

      {/* horizontal scroll thread */}
      <div className="relative z-10 mt-16 overflow-x-auto pb-8">
        <div className="relative mx-auto flex min-w-max items-start gap-24 px-16">
          {/* the thread */}
          <div className="absolute left-16 right-16 top-7 h-px bg-gradient-to-r from-transparent via-vault-gold/60 to-transparent" />
          {TIMELINE.map((yr, i) => {
            const open = openYear === yr.year;
            return (
              <motion.div
                key={yr.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative w-72"
              >
                <button onClick={() => setOpenYear(yr.year)} className="group flex flex-col items-center">
                  <motion.span
                    className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 font-display"
                    style={{
                      borderColor: open ? 'var(--vault-gold)' : 'rgba(201,168,76,0.4)',
                      background: open ? 'var(--vault-gold)' : 'var(--vault-black)',
                      color: open ? '#0a0a14' : 'var(--vault-gold)',
                    }}
                    animate={open ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {String(yr.year).slice(2)}
                  </motion.span>
                  <span className="mt-4 font-display text-glow-gold" style={{ fontSize: '1.4rem', color: 'var(--vault-light-gold)' }}>
                    {yr.year}
                  </span>
                  <span className="mt-1 font-serif-display italic text-vault-mist" style={{ fontSize: '1.05rem', lineHeight: 1.2 }}>
                    {yr.theme}
                  </span>
                  <span className="mt-2 font-mono-data text-[0.65rem] text-vault-gold/60">
                    {yr.topicIds.length} topics explored
                  </span>
                </button>

                {open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-5 space-y-2 overflow-hidden"
                  >
                    {yr.topicIds.slice(0, 10).map((id) => {
                      const t = TOPIC_MAP[id];
                      const accent = CLUSTERS[t.cluster].color === '#3a3a5c' ? '#8a8aff' : CLUSTERS[t.cluster].color;
                      return (
                        <button
                          key={id}
                          onClick={() => enterTopic(id)}
                          className="flex w-full items-center gap-2 rounded-lg border border-vault-gold/10 bg-vault-black/50 px-3 py-2 text-left transition-colors hover:border-vault-gold/40"
                        >
                          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: accent }} />
                          <span className="font-serif-display text-vault-white" style={{ fontSize: '1rem' }}>
                            {t.name}
                          </span>
                        </button>
                      );
                    })}
                    {yr.topicIds.length > 10 && (
                      <p className="px-3 font-mono-data text-[0.65rem] text-vault-mist/60">
                        + {yr.topicIds.length - 10} more along this thread
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      <p className="relative z-10 mt-2 text-center font-mono-data text-[0.65rem] uppercase tracking-[0.3em] text-vault-mist/50">
        scroll horizontally · click a year to unroll its topics
      </p>
    </div>
  );
}
