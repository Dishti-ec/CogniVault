import { useState } from 'react';
import { StarField } from '../components/StarField';
import { useVault } from '../lib/vault-context';
import {
  TOPICS,
  TOPIC_MAP,
  CLUSTERS,
  STATUS_META,
  QUESTIONS,
  type ClusterId,
  type Status,
} from '../data/vault';

const W = 1200;
const H = 1200;
const CX = W / 2;
const CY = H / 2;

type FilterMode = 'all' | ClusterId | Status;

export function Nexus() {
  const { enterTopic } = useVault();
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<FilterMode>('all');
  const [hover, setHover] = useState<string | null>(null);

  // map galaxy coords to a centered radial layout
  const nodes = TOPICS.map((t) => ({
    ...t,
    nx: CX + (t.x - 0.5) * W * 0.92,
    ny: CY + (t.y - 0.5) * H * 0.92,
  }));
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const isActive = (t: (typeof nodes)[number]) =>
    mode === 'all' ||
    t.cluster === mode ||
    t.status === mode;

  const questionTargets = new Set(QUESTIONS.flatMap((q) => q.related));

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <StarField density={60} showNebula={false} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,47,160,0.18),transparent_60%)]" />

      {/* title */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 px-6 pt-16 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-vault-gold/70">Room X · The Capstone</p>
        <h1
          className="mt-2 font-display text-glow-gold"
          style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--vault-light-gold)' }}
        >
          The Nexus
        </h1>
        <p className="mt-1 font-serif-display text-vault-mist" style={{ fontSize: '1.1rem' }}>
          Every topic, every thread, every open question — one living graph. Hover to pause its rotation.
        </p>
      </div>

      {/* filters */}
      <div className="absolute left-1/2 top-[9.5rem] z-20 flex -translate-x-1/2 flex-wrap justify-center gap-2 px-4">
        <NexusPill active={mode === 'all'} onClick={() => setMode('all')} color="#c9a84c">All</NexusPill>
        {(Object.keys(CLUSTERS) as ClusterId[]).map((c) => (
          <NexusPill
            key={c}
            active={mode === c}
            onClick={() => setMode(c)}
            color={CLUSTERS[c].color === '#3a3a5c' ? '#8a8aff' : CLUSTERS[c].color}
          >
            {CLUSTERS[c].name}
          </NexusPill>
        ))}
        {(Object.keys(STATUS_META) as Status[]).map((s) => (
          <NexusPill key={s} active={mode === s} onClick={() => setMode(s)} color={STATUS_META[s].color}>
            {STATUS_META[s].label}
          </NexusPill>
        ))}
      </div>

      {/* rotating graph */}
      <div className="absolute inset-0 grid place-items-center">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-[120vh] w-[120vh] max-w-none"
          style={{
            animation: 'nexus-spin 240s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
            transformOrigin: 'center',
          }}
        >
          {/* threads */}
          {nodes.map((t) =>
            t.connections.map((cid) => {
              const o = nodeMap[cid];
              if (!o || o.id < t.id) return null;
              const lit = isActive(t) && isActive(o);
              return (
                <line
                  key={t.id + cid}
                  x1={t.nx}
                  y1={t.ny}
                  x2={o.nx}
                  y2={o.ny}
                  stroke={CLUSTERS[t.cluster].color}
                  strokeOpacity={lit ? 0.22 : 0.03}
                  strokeWidth={1}
                />
              );
            }),
          )}

          {/* nodes */}
          {nodes.map((t) => {
            const c = CLUSTERS[t.cluster];
            const active = isActive(t);
            const completed = t.status === 'completed';
            const hasQuestion = questionTargets.has(t.id);
            const isHover = hover === t.id;
            return (
              <g
                key={t.id}
                transform={`translate(${t.nx},${t.ny})`}
                className="cursor-pointer"
                opacity={active ? 1 : 0.12}
                onMouseEnter={() => {
                  setPaused(true);
                  setHover(t.id);
                }}
                onMouseLeave={() => {
                  setPaused(false);
                  setHover(null);
                }}
                onClick={() => enterTopic(t.id)}
              >
                {hasQuestion && (
                  <circle r={t.size + 16} fill="none" stroke="#f0e0a0" strokeWidth={1}>
                    <animate attributeName="r" values={`${t.size + 12};${t.size + 22};${t.size + 12}`} dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle r={t.size + 12} fill={c.glow} opacity={isHover ? 0.5 : completed ? 0.3 : 0.14} />
                <circle r={t.size + (completed ? 4 : 2)} fill={completed ? '#f0e0a0' : '#f8f4ee'} opacity={completed ? 1 : 0.82} />
                {isHover && (
                  <text
                    x={t.size + 14}
                    y={4}
                    fontFamily="Cormorant Garamond, serif"
                    fontSize={20}
                    fill="#f5edd6"
                  >
                    {t.name}
                  </text>
                )}
              </g>
            );
          })}

          {/* core */}
          <circle cx={CX} cy={CY} r={10} fill="#f0e0a0">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* legend */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-5 rounded-full border border-vault-gold/20 bg-vault-black/70 px-6 py-2 font-mono-data text-[0.62rem] text-vault-mist backdrop-blur-xl">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-vault-light-gold" /> completed</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full border border-vault-light-gold" /> open question</span>
        <span>{TOPICS.length} nodes · {QUESTIONS.length} mysteries</span>
      </div>
    </div>
  );
}

function NexusPill({
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
      className="rounded-full border px-3 py-1 font-display text-[0.58rem] uppercase tracking-[0.12em] backdrop-blur-md transition-all"
      style={{
        borderColor: active ? color : 'rgba(201,168,76,0.18)',
        background: active ? color : 'rgba(10,10,20,0.5)',
        color: active ? '#0a0a14' : '#b0a0cc',
      }}
    >
      {children}
    </button>
  );
}
