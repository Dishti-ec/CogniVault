import { useMemo } from 'react';
import { motion } from 'motion/react';

interface StarFieldProps {
  density?: number;
  tint?: string; // overlay tint color
  showNebula?: boolean;
}

interface Star {
  x: number;
  y: number;
  r: number;
  delay: number;
  dur: number;
}

/**
 * Continuous, slowly-drifting parallax star field used behind every room.
 * Pure CSS/SVG — light enough to layer beneath any content.
 */
export function StarField({ density = 120, tint, showNebula = true }: StarFieldProps) {
  const stars = useMemo<Star[]>(() => {
    const out: Star[] = [];
    for (let i = 0; i < density; i++) {
      const s = Math.sin(i * 127.1) * 43758.5453;
      const t = Math.sin(i * 311.7) * 24634.6345;
      out.push({
        x: (s - Math.floor(s)) * 100,
        y: (t - Math.floor(t)) * 100,
        r: 0.4 + (s - Math.floor(s)) * 1.4,
        delay: (t - Math.floor(t)) * 6,
        dur: 3 + (s - Math.floor(s)) * 5,
      });
    }
    return out;
  }, [density]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 120% at 50% -10%, #1a0a2e 0%, #0d0d18 45%, #0a0a14 100%)',
        }}
      />
      {showNebula && (
        <>
          <div
            className="absolute -left-40 top-10 h-[60vh] w-[60vh] rounded-full blur-3xl opacity-25"
            style={{ background: 'radial-gradient(circle, #2d1b69, transparent 70%)' }}
          />
          <div
            className="absolute -right-40 bottom-0 h-[55vh] w-[55vh] rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #6b2fa0, transparent 70%)' }}
          />
        </>
      )}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        animate={{ x: [0, -4, 0], y: [0, 3, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'easeInOut' }}
      >
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r * 0.18}
            fill={i % 9 === 0 ? '#c9a84c' : '#f8f4ee'}
            style={{
              animation: `vault-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </motion.svg>
      {tint && (
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-40"
          style={{ background: `radial-gradient(circle at 50% 40%, ${tint}, transparent 70%)` }}
        />
      )}
    </div>
  );
}
