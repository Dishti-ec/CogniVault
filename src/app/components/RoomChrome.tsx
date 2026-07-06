import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { useVault, ROOMS } from '../lib/vault-context';

export function RoomHeader({
  numeral,
  title,
  subtitle,
}: {
  numeral: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="relative z-10 mx-auto max-w-5xl px-6 pt-24 text-center"
    >
      <p className="font-display text-xs uppercase tracking-[0.5em] text-vault-gold/70">
        Room {numeral}
      </p>
      <h1
        className="mt-4 font-display text-glow-gold"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', color: 'var(--vault-light-gold)', lineHeight: 1.1 }}
      >
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl font-serif-display text-vault-mist" style={{ fontSize: '1.25rem' }}>
        {subtitle}
      </p>
      <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-vault-gold/60 to-transparent" />
    </motion.header>
  );
}

export function ConstellationTrail() {
  const { trail, goto } = useVault();
  if (trail.length <= 1) return null;
  return (
    <div className="fixed left-6 top-6 z-40 hidden items-center gap-2 rounded-full border border-vault-gold/20 bg-vault-black/60 px-4 py-2 backdrop-blur-xl md:flex">
      {trail.map((id, i) => {
        const meta = ROOMS.find((r) => r.id === id)!;
        const last = i === trail.length - 1;
        return (
          <span key={`${id}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span className="text-vault-gold/40">·</span>}
            <button
              onClick={() => goto(id)}
              className={`font-display text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${
                last ? 'text-vault-light-gold' : 'text-vault-mist hover:text-vault-gold'
              }`}
            >
              {meta.short}
            </button>
          </span>
        );
      })}
    </div>
  );
}

export function ReturnToGalaxy() {
  const { goto, room } = useVault();
  if (room === 'entrance' || room === 'galaxy') return null;
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => goto('galaxy')}
      className="fixed left-6 bottom-6 z-40 flex items-center gap-2 rounded-full border border-vault-gold/30 bg-vault-black/70 px-4 py-2 font-display text-[0.7rem] uppercase tracking-[0.2em] text-vault-gold backdrop-blur-xl transition-colors hover:bg-vault-gold/10"
    >
      <ChevronLeft size={16} /> Return to Galaxy
    </motion.button>
  );
}
