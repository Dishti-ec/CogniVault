import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass as CompassIcon, X } from 'lucide-react';
import { ROOMS, useVault, type RoomId } from '../lib/vault-context';

const ICON: Partial<Record<RoomId, string>> = {
  entrance: '🚪',
  domains: '🏛',
  galaxy: '✦',
  chamber: '◈',
  archive: '📜',
  observatory: '🛰',
  timeline: '⏳',
  library: '📚',
  questions: '❖',
  nexus: '🌌',
};

/**
 * Floating constellation-style menu. Hidden on the Grand Entrance,
 * available in every deeper room as the primary way to move between spaces.
 */
export function Compass() {
  const { room, goto } = useVault();
  const [open, setOpen] = useState(false);

  if (room === 'entrance') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="w-64 rounded-2xl border border-vault-gold/30 bg-vault-black/80 p-2 backdrop-blur-xl box-glow-gold"
          >
            <p className="px-3 py-2 font-display text-[0.65rem] uppercase tracking-[0.3em] text-vault-gold/70">
              The Vault · X Rooms
            </p>
            <div className="max-h-[60vh] overflow-y-auto">
              {ROOMS.map((r) => {
                const active = r.id === room;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      goto(r.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${
                      active
                        ? 'bg-vault-gold/15 text-vault-light-gold'
                        : 'text-vault-mist hover:bg-white/5 hover:text-vault-white'
                    }`}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-white/5 text-sm">
                      {ICON[r.id]}
                    </span>
                    <span className="font-display text-xs tracking-[0.12em] text-vault-gold/50 w-7">
                      {r.numeral}
                    </span>
                    <span className="font-serif-display text-[1.05rem] leading-tight">{r.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06, rotate: open ? 0 : 30 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        className="grid h-14 w-14 place-items-center rounded-full border border-vault-gold/40 bg-vault-black/70 text-vault-gold backdrop-blur-xl box-glow-gold"
        aria-label="Open the vault compass"
      >
        {open ? <X size={22} /> : <CompassIcon size={24} />}
      </motion.button>
    </div>
  );
}
