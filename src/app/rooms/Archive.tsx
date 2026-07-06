import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { StarField } from '../components/StarField';
import { RoomHeader } from '../components/RoomChrome';
import { useVault } from '../lib/vault-context';
import { TOPICS, CLUSTERS, STATUS_META, type ClusterId } from '../data/vault';

export function Archive() {
  const { enterTopic } = useVault();
  const [query, setQuery] = useState('');
  const [cluster, setCluster] = useState<ClusterId | 'all'>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOPICS.filter(
      (t) =>
        (cluster === 'all' || t.cluster === cluster) &&
        (q === '' || t.name.toLowerCase().includes(q)),
    );
  }, [query, cluster]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-32">
      <StarField density={80} />
      <RoomHeader
        numeral="V"
        title="The Archive"
        subtitle="Ancient scrolls meet a holographic file system. Every topic, structured into a research entry — searchable, filterable, eternal."
      />

      {/* search bar */}
      <div className="relative z-10 mx-auto mt-10 max-w-3xl px-6">
        <div className="flex items-center gap-3 rounded-full border border-vault-gold/30 bg-vault-black/60 px-5 py-3 backdrop-blur-xl box-glow-gold">
          <Search size={18} className="text-vault-gold" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the archive…"
            className="w-full bg-transparent font-serif-display text-vault-white placeholder:text-vault-mist/50 focus:outline-none"
            style={{ fontSize: '1.15rem' }}
          />
          <span className="font-mono-data text-[0.7rem] text-vault-mist">{results.length} entries</span>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Chip active={cluster === 'all'} onClick={() => setCluster('all')} color="#c9a84c">All</Chip>
          {(Object.keys(CLUSTERS) as ClusterId[]).map((c) => (
            <Chip
              key={c}
              active={cluster === c}
              onClick={() => setCluster(c)}
              color={CLUSTERS[c].color === '#3a3a5c' ? '#8a8aff' : CLUSTERS[c].color}
            >
              {CLUSTERS[c].wing}
            </Chip>
          ))}
        </div>
      </div>

      {/* scroll entries */}
      <div className="relative z-10 mx-auto mt-12 grid max-w-5xl gap-4 px-6 md:grid-cols-2">
        {results.map((t, i) => {
          const accent = CLUSTERS[t.cluster].color === '#3a3a5c' ? '#8a8aff' : CLUSTERS[t.cluster].color;
          const status = STATUS_META[t.status];
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.4) }}
              onClick={() => enterTopic(t.id)}
              className="group relative overflow-hidden rounded-xl border border-vault-gold/15 bg-gradient-to-br from-[#1c1530]/70 to-vault-black/70 p-5 text-left backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-vault-gold/40"
            >
              <div className="absolute left-0 top-0 h-full w-1" style={{ background: accent }} />
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif-display text-vault-light-gold" style={{ fontSize: '1.35rem', lineHeight: 1.15 }}>
                  {t.name}
                </h3>
                <span className="shrink-0 font-mono-data text-[0.65rem]" style={{ color: status.color }}>
                  {status.dot}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 font-serif-display text-vault-mist" style={{ fontSize: '1rem' }}>
                {t.overview}
              </p>
              <div className="mt-3 flex items-center gap-3 font-mono-data text-[0.65rem] uppercase tracking-[0.15em]" style={{ color: accent }}>
                <span>{CLUSTERS[t.cluster].name}</span>
                <span className="text-vault-mist/50">· {t.year} · {status.label}</span>
              </div>
            </motion.button>
          );
        })}
        {results.length === 0 && (
          <p className="col-span-full text-center font-serif-display italic text-vault-mist">
            No scrolls match that inquiry. Let curiosity choose another path.
          </p>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  color,
  children,
}: {
  active: boolean;
  onClick: () => void;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border px-4 py-1.5 font-display text-[0.6rem] uppercase tracking-[0.15em] transition-all"
      style={{
        borderColor: active ? color : 'rgba(201,168,76,0.2)',
        background: active ? color : 'transparent',
        color: active ? '#0a0a14' : '#b0a0cc',
      }}
    >
      {children}
    </button>
  );
}
