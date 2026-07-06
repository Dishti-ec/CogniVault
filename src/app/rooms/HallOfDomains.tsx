import { motion } from 'motion/react';
import { StarField } from '../components/StarField';
import { RoomHeader } from '../components/RoomChrome';
import { useVault } from '../lib/vault-context';
import { DOMAINS, CLUSTERS, topicsByCluster } from '../data/vault';

export function HallOfDomains() {
  const { goto, setGalaxyFilter } = useVault();

  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-32">
      <StarField density={120} />

      <RoomHeader
        numeral="II"
        title="Hall of Domains"
        subtitle="Four towering portals, each opening onto a wing of the vault. Choose a doorway — the galaxy beyond will narrow to its constellation."
      />

      <div className="relative z-10 mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {DOMAINS.map((d, i) => {
          const primary = CLUSTERS[d.clusters[0]];
          const count = d.clusters.reduce((n, c) => n + topicsByCluster(c).length, 0);
          return (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.8 }}
              whileHover={{ y: -10 }}
              onClick={() => {
                setGalaxyFilter(d.clusters[0]);
                goto('galaxy');
              }}
              className="group relative h-[26rem] overflow-hidden rounded-t-[8rem] rounded-b-2xl border border-vault-gold/25 bg-vault-black/50 p-6 text-center backdrop-blur-sm transition-colors hover:border-vault-gold/60"
              style={{ boxShadow: `inset 0 -60px 80px -40px ${d.color}` }}
            >
              {/* portal light */}
              <motion.div
                className="absolute left-1/2 top-1/2 h-72 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ background: d.color }}
                animate={{ opacity: [0.18, 0.4, 0.18] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative flex h-full flex-col items-center justify-between">
                <div className="mt-8">
                  <div
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full border font-display text-2xl"
                    style={{ borderColor: d.color, color: 'var(--vault-light-gold)' }}
                  >
                    {['☿', '✶', '☉', '♆'][i]}
                  </div>
                  <h3
                    className="mt-6 font-display text-glow-gold"
                    style={{ fontSize: '1.6rem', color: 'var(--vault-light-gold)' }}
                  >
                    {d.name}
                  </h3>
                  <p className="mt-2 font-serif-display text-vault-mist" style={{ fontSize: '1.05rem' }}>
                    {d.tagline}
                  </p>
                </div>
                <div className="w-full">
                  <div className="mb-3 space-y-1">
                    {d.topics.map((t) => (
                      <p key={t} className="font-mono-data text-[0.7rem] text-vault-mist/70">
                        {t}
                      </p>
                    ))}
                  </div>
                  <p
                    className="font-display text-[0.65rem] uppercase tracking-[0.25em]"
                    style={{ color: primary.color === '#3a3a5c' ? '#9a9aff' : 'var(--vault-gold)' }}
                  >
                    {count} stars · {primary.name}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="relative z-10 mt-16 text-center font-serif-display italic text-vault-mist/70">
        Or open the compass to leap directly to any of the ten rooms.
      </p>
    </div>
  );
}
