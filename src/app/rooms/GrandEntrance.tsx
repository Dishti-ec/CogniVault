import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StarField } from '../components/StarField';
import { useVault } from '../lib/vault-context';
import { TOTAL_TOPIC_COUNT } from '../data/vault';

// Floating astronomical glyphs that react to the cursor.
const GLYPHS = ['☉', '☽', '♄', '♃', '✶', '⚷', '✷', '☿', '✦', '♆'];

export function GrandEntrance() {
  const { goto } = useVault();
  const [opening, setOpening] = useState(false);
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 });

  const handleEnter = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => goto('domains'), 1700);
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={(e) =>
        setCursor({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
      }
    >
      <StarField density={180} />

      {/* Floating glyphs with parallax */}
      <div className="pointer-events-none absolute inset-0">
        {GLYPHS.map((g, i) => {
          const px = (i * 97) % 100;
          const py = (i * 53) % 100;
          const depth = 0.4 + (i % 4) * 0.25;
          return (
            <motion.span
              key={g}
              className="absolute font-display text-vault-gold/40 select-none"
              style={{
                left: `${px}%`,
                top: `${py}%`,
                fontSize: `${1.4 + (i % 3) * 0.9}rem`,
                x: (cursor.x - 0.5) * 60 * depth,
                y: (cursor.y - 0.5) * 60 * depth,
              }}
              animate={{ opacity: [0.2, 0.55, 0.2] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              {g}
            </motion.span>
          );
        })}
      </div>

      {/* The Door */}
      <div className="absolute inset-0 grid place-items-center px-6">
        <div className="relative flex flex-col items-center">
          <motion.div
            className="relative"
            animate={opening ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <Door cursor={cursor} />
          </motion.div>

          <AnimatePresence>
            {!opening && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <p className="font-display text-[0.7rem] uppercase tracking-[0.55em] text-vault-gold/70">
                  Est. outside space & time
                </p>
                <h1
                  className="mt-5 font-display text-glow-gold"
                  style={{
                    fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
                    color: 'var(--vault-light-gold)',
                    lineHeight: 1.05,
                  }}
                >
                  Welcome to the
                  <br />
                  Research Vault
                </h1>
                <p
                  className="mt-6 font-serif-display italic text-vault-mist"
                  style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.6rem)' }}
                >
                  {TOTAL_TOPIC_COUNT}+ topics. One lifelong journey of curiosity.
                </p>

                <motion.button
                  onClick={handleEnter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="pointer-events-auto mt-12 rounded-full border border-vault-gold/60 bg-vault-gold/10 px-10 py-4 font-display text-sm uppercase tracking-[0.35em] text-vault-light-gold backdrop-blur-sm box-glow-gold"
                >
                  Enter the Vault
                </motion.button>
                <p className="mt-4 font-mono-data text-[0.65rem] uppercase tracking-[0.3em] text-vault-mist/50">
                  click the door to begin
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* fog at base */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-vault-black to-transparent" />

      {/* white flash on entry */}
      <AnimatePresence>
        {opening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.7, times: [0, 0.7, 1] }}
            className="pointer-events-none absolute inset-0 bg-vault-light-gold"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Door({ cursor }: { cursor: { x: number; y: number } }) {
  return (
    <motion.button
      aria-label="Open the vault door"
      onClick={() => {}}
      className="relative cursor-pointer"
      style={{
        x: (cursor.x - 0.5) * -18,
      }}
    >
      <svg
        width="320"
        height="520"
        viewBox="0 0 320 520"
        className="max-h-[70vh] w-auto drop-shadow-[0_0_60px_rgba(201,168,76,0.25)]"
      >
        <defs>
          <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#241338" />
            <stop offset="100%" stopColor="#120a22" />
          </linearGradient>
          <radialGradient id="coreGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f0e0a0" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* arch */}
        <path
          d="M40 500 V160 A120 120 0 0 1 280 160 V500 Z"
          fill="url(#stone)"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        {/* seam */}
        <line x1="160" y1="60" x2="160" y2="500" stroke="#c9a84c" strokeOpacity="0.35" strokeWidth="1.5" />

        {/* concentric inscription rings */}
        {[150, 110, 70].map((r, i) => (
          <motion.circle
            key={r}
            cx="160"
            cy="250"
            r={r}
            fill="none"
            stroke="#c9a84c"
            strokeOpacity={0.3 - i * 0.05}
            strokeWidth="1"
            strokeDasharray="4 10"
            initial={{ rotate: 0 }}
            animate={{ rotate: i % 2 ? -360 : 360 }}
            transition={{ duration: 60 + i * 30, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '160px 250px' }}
          />
        ))}

        {/* glyph ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const cx = 160 + Math.cos(a) * 92;
          const cy = 250 + Math.sin(a) * 92;
          return (
            <text
              key={i}
              x={cx}
              y={cy}
              fontSize="13"
              textAnchor="middle"
              fill="#f0e0a0"
              fillOpacity="0.6"
              fontFamily="Cinzel, serif"
            >
              {['✦', '☉', '♄', '☽', '✶', '♃', '⚷', '☿', '✷', '♆', '✧', '✺'][i]}
            </text>
          );
        })}

        {/* glowing core */}
        <circle cx="160" cy="250" r="60" fill="url(#coreGlow)" />
        <motion.circle
          cx="160"
          cy="250"
          r="10"
          fill="#f0e0a0"
          animate={{ opacity: [0.5, 1, 0.5], r: [10, 13, 10] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.button>
  );
}
