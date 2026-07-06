import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ClusterId } from '../data/vault';

export type RoomId =
  | 'entrance'
  | 'domains'
  | 'galaxy'
  | 'chamber'
  | 'archive'
  | 'observatory'
  | 'timeline'
  | 'library'
  | 'questions'
  | 'nexus';

export interface RoomMeta {
  id: RoomId;
  numeral: string;
  name: string;
  short: string;
}

export const ROOMS: RoomMeta[] = [
  { id: 'entrance', numeral: 'I', name: 'Grand Entrance', short: 'Entrance' },
  { id: 'domains', numeral: 'II', name: 'Hall of Domains', short: 'Domains' },
  { id: 'galaxy', numeral: 'III', name: 'Knowledge Galaxy', short: 'Galaxy' },
  { id: 'chamber', numeral: 'IV', name: 'Topic Chambers', short: 'Chambers' },
  { id: 'archive', numeral: 'V', name: 'The Archive', short: 'Archive' },
  { id: 'observatory', numeral: 'VI', name: 'The Observatory', short: 'Observatory' },
  { id: 'timeline', numeral: 'VII', name: 'Timeline of Discovery', short: 'Timeline' },
  { id: 'library', numeral: 'VIII', name: 'The Library', short: 'Library' },
  { id: 'questions', numeral: 'IX', name: 'Future Questions', short: 'Questions' },
  { id: 'nexus', numeral: 'X', name: 'The Nexus', short: 'Nexus' },
];

interface VaultState {
  room: RoomId;
  trail: RoomId[];
  activeTopicId: string | null;
  galaxyFilter: ClusterId | null;
  goto: (room: RoomId) => void;
  enterTopic: (id: string) => void;
  setGalaxyFilter: (c: ClusterId | null) => void;
  back: () => void;
}

const Ctx = createContext<VaultState | null>(null);

export function VaultProvider({ children }: { children: ReactNode }) {
  const [room, setRoom] = useState<RoomId>('entrance');
  const [trail, setTrail] = useState<RoomId[]>(['entrance']);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [galaxyFilter, setGalaxyFilter] = useState<ClusterId | null>(null);

  const goto = useCallback((next: RoomId) => {
    setRoom(next);
    setTrail((t) => (t[t.length - 1] === next ? t : [...t, next].slice(-8)));
  }, []);

  const enterTopic = useCallback(
    (id: string) => {
      setActiveTopicId(id);
      goto('chamber');
    },
    [goto],
  );

  const back = useCallback(() => {
    setTrail((t) => {
      if (t.length <= 1) return t;
      const next = t.slice(0, -1);
      setRoom(next[next.length - 1]);
      return next;
    });
  }, []);

  return (
    <Ctx.Provider
      value={{ room, trail, activeTopicId, galaxyFilter, goto, enterTopic, setGalaxyFilter, back }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useVault() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useVault must be used within VaultProvider');
  return ctx;
}
