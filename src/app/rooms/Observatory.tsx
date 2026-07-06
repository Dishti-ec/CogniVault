import { motion } from 'motion/react';
import { StarField } from '../components/StarField';
import { RoomHeader } from '../components/RoomChrome';
import { useVault } from '../lib/vault-context';
import { TOPICS, STATUS_META, type Status, topicsByStatus } from '../data/vault';

const RING_ORDER: Status[] = ['reading', 'researching', 'writing', 'paused', 'completed'];

export function Observatory() {
  const { enterTopic } = useVault();

  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-32">
      <StarField density={70} tint="rgba(74,155,232,0.5)" />
      <RoomHeader
        numeral="VI"
        title="The Observatory"
        subtitle="A holographic mission table. Active topics orbit the core, each ring a phase of research — from first reading to completed archive."
      />

      {/* holographic table */}
      <div className="relative z-10 mx-auto mt-10 grid h-[34rem] place-items-center">
        <div className="relative h-[32rem] w-[32rem] max-w-[88vw]">
          {/* dome glow */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(74,155,232,0.16),transparent_65%)]" />
          {/* center core */}
          <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-vault-gold/40 bg-vault-black/70 text-center box-glow-gold">
            <div>
              <p className="font-display text-glow-gold" style={{ fontSize: '1.6rem', color: 'var(--vault-light-gold)' }}>
                {TOPICS.length}
              </p>
              <p className="font-mono-data text-[0.55rem] uppercase tracking-[0.2em] text-vault-mist">active</p>
            </div>
          </div>

          {RING_ORDER.map((status, ri) => {
            const radius = 90 + ri * 42;
            const items = topicsByStatus(status).slice(0, 6);
            const meta = STATUS_META[status];
            const dur = 40 + ri * 14;
            return (
              <div key={status} className="absolute inset-0">
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    borderColor: `${meta.color}40`,
                  }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2"
                  style={{ width: 0, height: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
                >
                  {items.map((t, i) => {
                    const a = (i / items.length) * Math.PI * 2;
                    return (
                      <motion.button
                        key={t.id}
                        onClick={() => enterTopic(t.id)}
                        animate={{ rotate: -360 }}
                        transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
                        className="group absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: Math.cos(a) * radius, top: Math.sin(a) * radius }}
                      >
                        <span
                          className="block h-3.5 w-3.5 rounded-full transition-transform group-hover:scale-150"
                          style={{ background: meta.color, boxShadow: `0 0 10px ${meta.color}` }}
                        />
                        <span className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-vault-black/90 px-2 py-1 font-mono-data text-[0.6rem] text-vault-white group-hover:block">
                          {t.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* status legend / counts */}
      <div className="relative z-10 mx-auto mt-4 grid max-w-4xl grid-cols-2 gap-3 px-6 sm:grid-cols-5">
        {RING_ORDER.map((s) => {
          const meta = STATUS_META[s];
          const count = topicsByStatus(s).length;
          return (
            <div
              key={s}
              className="rounded-xl border border-vault-gold/15 bg-vault-black/50 p-4 text-center backdrop-blur-sm"
            >
              <p className="font-display text-glow-gold" style={{ fontSize: '1.8rem', color: meta.color }}>
                {count}
              </p>
              <p className="mt-1 font-display text-[0.6rem] uppercase tracking-[0.2em] text-vault-mist">
                {meta.dot} {meta.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
