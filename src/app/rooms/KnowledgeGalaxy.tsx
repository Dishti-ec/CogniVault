import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Maximize } from 'lucide-react';
import { StarField } from '../components/StarField';
import { useVault } from '../lib/vault-context';
import {
  TOPICS,
  CLUSTERS,
  TOPIC_MAP,
  STATUS_META,
  type ClusterId,
  type Topic,
} from '../data/vault';

const W = 1600;
const H = 1000;

export function KnowledgeGalaxy() {
  const { enterTopic, galaxyFilter, setGalaxyFilter } = useVault();
  const [zoom, setZoom] = useState(0.8);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState<Topic | null>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const moved = useRef(false);

  const onWheel = useCallback((e: React.WheelEvent) => {
    setZoom((z) => Math.min(2.6, Math.max(0.5, z - e.deltaY * 0.0012)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    moved.current = false;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved.current = true;
    setOffset({ x: drag.current.ox + dx, y: drag.current.oy + dy });
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const reset = () => {
    setZoom(0.8);
    setOffset({ x: 0, y: 0 });
  };

  const dim = (t: Topic) => galaxyFilter && t.cluster !== galaxyFilter;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <StarField density={90} showNebula={false} />

      {/* title overlay */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 px-6 pt-20 text-center">
        <p className="font-display text-xs uppercase tracking-[0.5em] text-vault-gold/70">Room III</p>
        <h1
          className="mt-2 font-display text-glow-gold"
          style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', color: 'var(--vault-light-gold)' }}
        >
          Knowledge Galaxy
        </h1>
        <p className="mt-1 font-serif-display text-vault-mist" style={{ fontSize: '1.1rem' }}>
          Every topic is a star. Drag to roam · scroll to zoom · click a star to enter its chamber.
        </p>
      </div>

      {/* cluster filter pills */}
      <div className="absolute left-1/2 top-[10.5rem] z-20 flex -translate-x-1/2 flex-wrap justify-center gap-2 px-4">
        <FilterPill active={galaxyFilter === null} onClick={() => setGalaxyFilter(null)} color="#c9a84c">
          All Constellations
        </FilterPill>
        {(Object.keys(CLUSTERS) as ClusterId[]).map((c) => (
          <FilterPill
            key={c}
            active={galaxyFilter === c}
            onClick={() => setGalaxyFilter(galaxyFilter === c ? null : c)}
            color={CLUSTERS[c].color === '#3a3a5c' ? '#8a8aff' : CLUSTERS[c].color}
          >
            {CLUSTERS[c].name}
          </FilterPill>
        ))}
      </div>

      {/* the canvas */}
      <div
        className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `translate(-50%,-50%) translate(${offset.x}px,${offset.y}px) scale(${zoom})`,
            transition: drag.current ? 'none' : 'transform 0.25s ease-out',
          }}
        >
          <svg width={W} height={H} className="overflow-visible">
            {/* constellation lines */}
            {TOPICS.map((t) =>
              t.connections.map((cid) => {
                const o = TOPIC_MAP[cid];
                if (!o || o.id < t.id) return null;
                const faded = dim(t) || dim(o);
                return (
                  <line
                    key={t.id + cid}
                    x1={t.x * W}
                    y1={t.y * H}
                    x2={o.x * W}
                    y2={o.y * H}
                    stroke={CLUSTERS[t.cluster].color}
                    strokeOpacity={faded ? 0.04 : 0.16}
                    strokeWidth={1}
                  />
                );
              }),
            )}

            {/* stars */}
            {TOPICS.map((t) => {
              const c = CLUSTERS[t.cluster];
              const faded = dim(t);
              const isHover = hover?.id === t.id;
              return (
                <g
                  key={t.id}
                  transform={`translate(${t.x * W},${t.y * H})`}
                  className="cursor-pointer"
                  opacity={faded ? 0.18 : 1}
                  onMouseEnter={() => setHover(t)}
                  onMouseLeave={() => setHover((h) => (h?.id === t.id ? null : h))}
                  onClick={() => {
                    if (!moved.current) enterTopic(t.id);
                  }}
                >
                  <circle r={t.size + 14} fill={c.glow} opacity={isHover ? 0.4 : 0.13} />
                  <circle r={t.size + 2} fill="#f8f4ee" opacity={isHover ? 1 : 0.85} />
                  <circle r={t.size + 6} fill="none" stroke={c.color} strokeWidth={isHover ? 2 : 1} opacity={0.7} />
                  {(isHover || zoom > 1.4) && (
                    <text
                      x={t.size + 12}
                      y={4}
                      fontFamily="Cormorant Garamond, serif"
                      fontSize={15}
                      fill="#f5edd6"
                    >
                      {t.name}
                    </text>
                  )}
                </g>
              );
            })}

            {/* cluster labels */}
            {(Object.keys(CLUSTERS) as ClusterId[]).map((cid) => {
              const stars = TOPICS.filter((t) => t.cluster === cid);
              const cx = (stars.reduce((s, t) => s + t.x, 0) / stars.length) * W;
              const cy = (stars.reduce((s, t) => s + t.y, 0) / stars.length) * H - 150;
              return (
                <text
                  key={cid}
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  fontFamily="Cinzel, serif"
                  fontSize={26}
                  letterSpacing="6"
                  fill={CLUSTERS[cid].color === '#3a3a5c' ? '#8a8aff' : CLUSTERS[cid].color}
                  opacity={galaxyFilter && galaxyFilter !== cid ? 0.15 : 0.5}
                >
                  {CLUSTERS[cid].name.toUpperCase()}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* hover preview card */}
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none absolute bottom-24 left-1/2 z-30 w-80 -translate-x-1/2 rounded-2xl border border-vault-gold/30 bg-vault-black/85 p-5 backdrop-blur-xl box-glow-gold"
          >
            <p
              className="font-display text-[0.65rem] uppercase tracking-[0.25em]"
              style={{ color: CLUSTERS[hover.cluster].color === '#3a3a5c' ? '#8a8aff' : CLUSTERS[hover.cluster].color }}
            >
              {CLUSTERS[hover.cluster].name}
            </p>
            <h3 className="mt-1 font-serif-display text-vault-light-gold" style={{ fontSize: '1.4rem', lineHeight: 1.15 }}>
              {hover.name}
            </h3>
            <div className="mt-3 flex items-center justify-between font-mono-data text-[0.7rem] text-vault-mist">
              <span>{STATUS_META[hover.status].dot} {STATUS_META[hover.status].label}</span>
              <span>{hover.connections.length} links · {hover.year}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* zoom compass */}
      <div className="absolute bottom-24 right-6 z-30 flex flex-col items-center gap-2 rounded-2xl border border-vault-gold/25 bg-vault-black/70 p-2 backdrop-blur-xl">
        <ZoomBtn onClick={() => setZoom((z) => Math.min(2.6, z + 0.25))}><Plus size={16} /></ZoomBtn>
        <div className="font-mono-data text-[0.6rem] text-vault-gold/70">{Math.round(zoom * 100)}%</div>
        <ZoomBtn onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}><Minus size={16} /></ZoomBtn>
        <div className="my-1 h-px w-6 bg-vault-gold/20" />
        <ZoomBtn onClick={reset}><Maximize size={15} /></ZoomBtn>
      </div>
    </div>
  );
}

function FilterPill({
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
      className="rounded-full border px-4 py-1.5 font-display text-[0.65rem] uppercase tracking-[0.18em] backdrop-blur-md transition-all"
      style={{
        borderColor: active ? color : 'rgba(201,168,76,0.2)',
        color: active ? '#0a0a14' : '#b0a0cc',
        background: active ? color : 'rgba(10,10,20,0.6)',
      }}
    >
      {children}
    </button>
  );
}

function ZoomBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="grid h-8 w-8 place-items-center rounded-lg text-vault-gold transition-colors hover:bg-vault-gold/15"
    >
      {children}
    </button>
  );
}
