import { useState } from 'react';
import { motion } from 'motion/react';
import { Book, Film, FileText, GraduationCap, Newspaper, Mic } from 'lucide-react';
import { StarField } from '../components/StarField';
import { RoomHeader } from '../components/RoomChrome';
import { RESOURCES, CLUSTERS, type Resource } from '../data/vault';

const TYPE_ICON: Record<Resource['type'], React.ReactNode> = {
  Book: <Book size={16} />,
  Documentary: <Film size={16} />,
  Paper: <FileText size={16} />,
  Course: <GraduationCap size={16} />,
  Article: <Newspaper size={16} />,
  Podcast: <Mic size={16} />,
};

const CATEGORIES: Resource['type'][] = ['Book', 'Documentary', 'Paper', 'Course', 'Article', 'Podcast'];

export function Library() {
  const [filter, setFilter] = useState<Resource['type'] | 'all'>('all');
  const shown = RESOURCES.filter((r) => filter === 'all' || r.type === filter);

  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-32">
      <StarField density={70} tint="rgba(198,126,26,0.4)" />
      <RoomHeader
        numeral="VIII"
        title="The Library"
        subtitle="Stone shelves stretching into the dark. Each book is a resource — a documentary, a paper, a course — waiting to be pulled from its alcove."
      />

      <div className="relative z-10 mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2 px-6">
        <ShelfTab active={filter === 'all'} onClick={() => setFilter('all')}>All Resources</ShelfTab>
        {CATEGORIES.map((c) => (
          <ShelfTab key={c} active={filter === c} onClick={() => setFilter(c)}>
            {c}s
          </ShelfTab>
        ))}
      </div>

      {/* shelves */}
      <div className="relative z-10 mx-auto mt-12 max-w-5xl space-y-10 px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => {
            const accent = CLUSTERS[r.cluster].color === '#3a3a5c' ? '#8a8aff' : CLUSTERS[r.cluster].color;
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.5) }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-lg border border-vault-gold/15 bg-gradient-to-b from-[#1d1430] to-vault-black p-5"
                style={{ boxShadow: `inset 3px 0 0 ${accent}` }}
              >
                <div className="flex items-center gap-2 font-display text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: accent }}>
                  {TYPE_ICON[r.type]} {r.type}
                </div>
                <h3 className="mt-3 font-serif-display text-vault-light-gold" style={{ fontSize: '1.3rem', lineHeight: 1.15 }}>
                  {r.title}
                </h3>
                <p className="mt-2 font-serif-display italic text-vault-mist" style={{ fontSize: '1rem' }}>
                  {r.author}
                </p>
                <p className="mt-3 font-mono-data text-[0.6rem] uppercase tracking-[0.15em] text-vault-mist/60">
                  {CLUSTERS[r.cluster].wing}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ShelfTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border px-4 py-1.5 font-display text-[0.6rem] uppercase tracking-[0.15em] transition-all"
      style={{
        borderColor: active ? 'var(--vault-gold)' : 'rgba(201,168,76,0.2)',
        background: active ? 'var(--vault-gold)' : 'transparent',
        color: active ? '#0a0a14' : '#b0a0cc',
      }}
    >
      {children}
    </button>
  );
}
