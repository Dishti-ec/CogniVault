// ───────────────────────────────────────────────────────────
//  THE RESEARCH VAULT — Knowledge Catalog
//  The world that holds the topics. Add a topic = add a star.
// ───────────────────────────────────────────────────────────

export type ClusterId = 'crimson' | 'amber' | 'violet' | 'void';
export type DomainId = 'technology' | 'humanity' | 'science' | 'future';
export type Status = 'reading' | 'researching' | 'writing' | 'paused' | 'completed';

export interface Cluster {
  id: ClusterId;
  name: string;
  wing: string;
  color: string;
  glow: string;
  blurb: string;
}

export interface DomainWing {
  id: DomainId;
  name: string;
  tagline: string;
  color: string;
  clusters: ClusterId[];
  topics: string[]; // example focus topics
}

export interface Topic {
  id: string;
  name: string;
  cluster: ClusterId;
  status: Status;
  year: number;
  overview: string;
  whyChosen: string;
  insights: string[];
  connections: string[]; // topic ids
  // computed/decorative
  x: number; // 0..1 galaxy coordinate
  y: number;
  size: number;
}

export interface VaultQuestion {
  id: string;
  text: string;
  related: string[];
}

export const CLUSTERS: Record<ClusterId, Cluster> = {
  crimson: {
    id: 'crimson',
    name: 'Crimson Nebula',
    wing: 'Literature & Film',
    color: '#8b1a2a',
    glow: 'rgba(200,60,80,0.9)',
    blurb: 'Story, drama, and the written word — from cursed films to lost epic poems.',
  },
  amber: {
    id: 'amber',
    name: 'Amber Constellation',
    wing: 'History & Science',
    color: '#c67e1a',
    glow: 'rgba(220,150,40,0.9)',
    blurb: 'Truth stranger than fiction — ancient mechanisms, supernovas, and forgotten empires.',
  },
  violet: {
    id: 'violet',
    name: 'Violet Mist',
    wing: 'Folklore & Myth',
    color: '#6b2fa0',
    glow: 'rgba(150,90,210,0.9)',
    blurb: 'Magic and belief — faeries, alchemy, and the spirits that haunt every culture.',
  },
  void: {
    id: 'void',
    name: 'The Dark Void',
    wing: 'Conspiracies & Mysteries',
    color: '#3a3a5c',
    glow: 'rgba(120,120,180,0.85)',
    blurb: 'Darkness and doubt — unsolved disappearances, secret programs, and modern myths.',
  },
};

export const DOMAINS: DomainWing[] = [
  {
    id: 'humanity',
    name: 'Humanity',
    tagline: 'Literature, philosophy & the human record',
    color: '#8b1a2a',
    clusters: ['crimson'],
    topics: ['Shakespeare & Modern Language', 'Dark Origins of Fairy Tales', 'The Epic of Gilgamesh'],
  },
  {
    id: 'science',
    name: 'Science',
    tagline: 'Physics, biology, astronomy & the cosmos',
    color: '#c67e1a',
    clusters: ['amber'],
    topics: ['Supernovas & Stellar Death', 'Mycorrhizal Networks', 'Quantum Theory'],
  },
  {
    id: 'technology',
    name: 'History',
    tagline: 'Ancient mechanisms & forgotten eras',
    color: '#c9a84c',
    clusters: ['amber'],
    topics: ['The Antikythera Mechanism', 'The Salem Witch Trials', 'The Space Race'],
  },
  {
    id: 'future',
    name: 'Mystery',
    tagline: 'Folklore, myth & the unexplained',
    color: '#6b2fa0',
    clusters: ['violet', 'void'],
    topics: ['The Voynich Manuscript', 'The Dyatlov Pass Incident', 'The Lore of the Fae'],
  },
];

const STATUSES: Status[] = ['reading', 'researching', 'writing', 'paused', 'completed'];

export const STATUS_META: Record<Status, { label: string; color: string; dot: string }> = {
  reading: { label: 'Reading', color: '#e8c84a', dot: '🟡' },
  researching: { label: 'Researching', color: '#4a9be8', dot: '🔵' },
  writing: { label: 'Writing', color: '#9b6fe0', dot: '🟣' },
  paused: { label: 'Paused', color: '#9a9aad', dot: '⚪' },
  completed: { label: 'Completed', color: '#4ad08a', dot: '🟢' },
};

// Raw catalog: [name, cluster, year]
const RAW: [string, ClusterId, number][] = [
  // ── Crimson Nebula — Literature & Film
  ['How Shakespeare Influenced Modern Language', 'crimson', 2025],
  ["Ovid's Heroides & the Female Voice", 'crimson', 2025],
  ["Ophelia's Madness — Symbolism", 'crimson', 2026],
  ['Dark Origins of Fairy Tales', 'crimson', 2025],
  ['The Disastrous Wizard of Oz Production', 'crimson', 2026],
  ['Jim Henson & the Muppets', 'crimson', 2026],
  ['The History of Puppetry', 'crimson', 2027],
  ['Cursed Films — Poltergeist & The Exorcist', 'crimson', 2025],
  ['The Lost Plays of Ancient Greece', 'crimson', 2027],
  ['Marginalia in Medieval Manuscripts', 'crimson', 2026],
  ['Mary Shelley Writing Frankenstein', 'crimson', 2025],
  ['The Epic of Gilgamesh', 'crimson', 2024],
  ['Nosferatu (1922) & Vampire Legend', 'crimson', 2026],
  ["James Joyce's Finnegans Wake", 'crimson', 2027],
  ['The Battle of Maldon — Lost Epic', 'crimson', 2027],
  ['Hidden Esoteric Symbolism in Cinema', 'crimson', 2026],
  ['The History of Banned Books', 'crimson', 2025],
  ['The Disney Animators Strike of 1941', 'crimson', 2026],
  ['The Invention of Modern High Fantasy', 'crimson', 2027],
  ['History of Bibliomancy', 'crimson', 2026],

  // ── Amber Constellation — Science
  ['Supernovas & Stellar Death', 'amber', 2026],
  ['Mycorrhizal Networks — Wood Wide Web', 'amber', 2026],
  ['Electroreception in Animals', 'amber', 2027],
  ['The Mariana Trench — What Was Found', 'amber', 2025],
  ['Anatoli Bugorski — Survived a Particle Accelerator', 'amber', 2026],
  ['Quantum Theory & Physics Fundamentals', 'amber', 2026],
  ['The Fibonacci Sequence in Nature', 'amber', 2025],
  ['Alex the Parrot — Animal Cognition', 'amber', 2027],
  ["Earth's Hadean Era", 'amber', 2027],
  ['Exoplanets & the Search for Life', 'amber', 2026],
  ['The Immortal Jellyfish', 'amber', 2025],
  ['Pando — The Quaking Aspen Clone', 'amber', 2026],
  ['The Wow! Signal (1977)', 'amber', 2025],
  ['Rogue Planets & Wandering Black Holes', 'amber', 2027],
  ["Chernobyl's Red Forest", 'amber', 2026],

  // ── Amber Constellation — History
  ['The Antikythera Mechanism', 'amber', 2024],
  ['Library of Alexandria — Theories & Truth', 'amber', 2024],
  ['Qin Shi Huang & the Terracotta Army', 'amber', 2025],
  ["Cleopatra's Daughter", 'amber', 2026],
  ['The Siege of Masada', 'amber', 2027],
  ['The Rosetta Stone & Decipherment', 'amber', 2025],
  ['The Salem Witch Trials — Full Account', 'amber', 2025],
  ['Victorian Mourning Traditions', 'amber', 2026],
  ['The Paris Catacombs', 'amber', 2026],
  ['The Lost Colony of Roanoke', 'amber', 2027],
  ['Nellie Bly — Investigative Journalist', 'amber', 2026],
  ['The Real Story of Marie Antoinette', 'amber', 2027],
  ['The Space Race — Full Account', 'amber', 2025],
  ['The Golden Age of Piracy', 'amber', 2026],
  ['The Boston Molasses Flood', 'amber', 2025],

  // ── Violet Mist — Folklore & Myth
  ['The Lore of the Fae & Faeries', 'violet', 2025],
  ['The Children of Woolpit', 'violet', 2026],
  ['The Voynich Manuscript', 'violet', 2024],
  ['The Codex Gigas', 'violet', 2026],
  ['Arthurian Legends & Merlin', 'violet', 2025],
  ['Mermaids in World Myth', 'violet', 2026],
  ['The Lore of the Selkies', 'violet', 2027],
  ['The History of Alchemy', 'violet', 2025],
  ['Folklore of the Aurora Borealis', 'violet', 2026],
  ['Vampire Legends Across Cultures', 'violet', 2025],
  ['History of Unicorn Mythology', 'violet', 2027],
  ['The History of Tarot', 'violet', 2026],
  ['Baba Yaga & the Chicken-Legged Hut', 'violet', 2025],
  ['The Wild Hunt', 'violet', 2027],
  ['The History of the Jinn', 'violet', 2026],
  ['The Tale of the Golem', 'violet', 2027],
  ['The Morrigan — Irish War Goddess', 'violet', 2026],
  ['Krampus — Origins & Traditions', 'violet', 2025],
  ['The Philosophers Stone in Alchemy', 'violet', 2026],

  // ── Dark Void — Conspiracies & Mysteries
  ['The Bermuda Triangle Mystery', 'void', 2025],
  ['The Dyatlov Pass Incident', 'void', 2025],
  ['The Vanishing of Doggerland', 'void', 2027],
  ['The SS Waratah Disappearance', 'void', 2026],
  ['33 Thomas Street — Secret Bunker', 'void', 2026],
  ['MKUltra — CIA Mind Control', 'void', 2025],
  ['Operation Mockingbird', 'void', 2026],
  ['COINTELPRO — Illegal FBI Projects', 'void', 2027],
  ['The Flannan Isles Lighthouse', 'void', 2026],
  ['The Smithsonian Giant Skeletons', 'void', 2025],
  ['The Black-Eyed Children', 'void', 2026],
  ['Project Blue Book — UFO Files', 'void', 2027],
  ['Heaven\'s Gate', 'void', 2025],
  ['The People\'s Temple — Jonestown', 'void', 2026],
  ['Remote Viewing — History & Belief', 'void', 2027],
];

// Deterministic pseudo-random for stable star placement.
function seeded(n: number) {
  const x = Math.sin(n * 999.97) * 43758.5453;
  return x - Math.floor(x);
}

// Loose nebula centers per cluster across the galaxy canvas (0..1).
const CLUSTER_CENTER: Record<ClusterId, [number, number]> = {
  crimson: [0.24, 0.32],
  amber: [0.72, 0.4],
  violet: [0.3, 0.72],
  void: [0.74, 0.74],
};

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const OVERVIEWS: Partial<Record<string, string>> = {};

export const TOPICS: Topic[] = RAW.map(([name, cluster, year], i) => {
  const [cx, cy] = CLUSTER_CENTER[cluster];
  const r = 0.04 + seeded(i + 1) * 0.16;
  const a = seeded(i + 7) * Math.PI * 2;
  const x = Math.min(0.96, Math.max(0.04, cx + Math.cos(a) * r));
  const y = Math.min(0.94, Math.max(0.06, cy + Math.sin(a) * r * 0.85));
  const status = STATUSES[Math.floor(seeded(i + 3) * STATUSES.length)];
  const size = 2 + Math.round(seeded(i + 11) * 4);
  return {
    id: slug(name),
    name,
    cluster,
    status,
    year,
    overview:
      OVERVIEWS[name] ??
      `A curated chamber within the ${CLUSTERS[cluster].name}. ${CLUSTERS[cluster].blurb} This topic is one thread in a lifelong study of ${CLUSTERS[cluster].wing.toLowerCase()}.`,
    whyChosen:
      'Discovered while wandering — the kind of strange, quiet subject that lodges in the mind and refuses to leave until it has been properly explored.',
    insights: [
      'The accepted narrative hides at least one stranger truth beneath the surface.',
      'Primary sources contradict the popular retelling in revealing ways.',
      'The subject connects outward to several neighbouring topics in the vault.',
      'What people feared — or hoped to find — shaped how the story was recorded.',
      'There remains an unresolved question worth carrying into future study.',
    ],
    connections: [],
    x,
    y,
    size,
  };
});

// Wire up connections: each topic links to a few nearby same-cluster stars.
TOPICS.forEach((t, i) => {
  const sameCluster = TOPICS.filter((o) => o.id !== t.id && o.cluster === t.cluster);
  sameCluster.sort((a, b) => {
    const da = (a.x - t.x) ** 2 + (a.y - t.y) ** 2;
    const db = (b.x - t.x) ** 2 + (b.y - t.y) ** 2;
    return da - db;
  });
  const count = 2 + Math.floor(seeded(i + 21) * 2);
  t.connections = sameCluster.slice(0, count).map((o) => o.id);
});

export const TOPIC_MAP: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
);

export function topicsByCluster(c: ClusterId) {
  return TOPICS.filter((t) => t.cluster === c);
}

export function topicsByStatus(s: Status) {
  return TOPICS.filter((t) => t.status === s);
}

export const TOTAL_TOPIC_COUNT = 214; // the world is built to hold 200+

export const QUESTIONS: VaultQuestion[] = [
  { id: 'q1', text: 'Can consciousness be simulated?', related: ['quantum-theory-physics-fundamentals'] },
  { id: 'q2', text: 'Will AGI surpass human understanding?', related: [] },
  { id: 'q3', text: 'What actually happened at Dyatlov Pass?', related: ['the-dyatlov-pass-incident'] },
  { id: 'q4', text: 'Can civilization become interplanetary before ecological collapse?', related: ['the-space-race-full-account'] },
  { id: 'q5', text: 'What creates meaning in the absence of metaphysics?', related: [] },
  { id: 'q6', text: 'Is there a pattern to the collapse of every great civilization?', related: ['library-of-alexandria-theories-truth'] },
  { id: 'q7', text: 'What was truly lost when the Library of Alexandria burned?', related: ['library-of-alexandria-theories-truth'] },
  { id: 'q8', text: 'Why does every culture, in isolation, dream of the same monsters?', related: ['vampire-legends-across-cultures', 'the-lore-of-the-fae-faeries'] },
];

export interface TimelineYear {
  year: number;
  theme: string;
  topicIds: string[];
}

export const TIMELINE: TimelineYear[] = [2024, 2025, 2026, 2027].map((year) => {
  const topicIds = TOPICS.filter((t) => t.year === year).map((t) => t.id);
  const counts: Record<ClusterId, number> = { crimson: 0, amber: 0, violet: 0, void: 0 };
  TOPICS.filter((t) => t.year === year).forEach((t) => (counts[t.cluster] += 1));
  const dominant = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'amber') as ClusterId;
  const themeMap: Record<number, string> = {
    2024: 'The First Threads — ancient mechanisms & lost texts',
    2025: 'The Year of Witches & Stars',
    2026: 'Deep Dives — empires, myth & the unexplained',
    2027: 'Outward — cosmos, folklore & open questions',
  };
  return { year, theme: themeMap[year] ?? CLUSTERS[dominant].wing, topicIds };
});

export interface Resource {
  id: string;
  title: string;
  author: string;
  type: 'Book' | 'Documentary' | 'Paper' | 'Course' | 'Article' | 'Podcast';
  cluster: ClusterId;
}

export const RESOURCES: Resource[] = [
  { id: 'r1', title: 'The Swerve: How the World Became Modern', author: 'Stephen Greenblatt', type: 'Book', cluster: 'crimson' },
  { id: 'r2', title: 'Cosmos', author: 'Carl Sagan', type: 'Book', cluster: 'amber' },
  { id: 'r3', title: 'Entangled Life', author: 'Merlin Sheldrake', type: 'Book', cluster: 'amber' },
  { id: 'r4', title: 'The Golden Bough', author: 'James George Frazer', type: 'Book', cluster: 'violet' },
  { id: 'r5', title: 'Decoding the Antikythera Mechanism', author: 'Nature', type: 'Paper', cluster: 'amber' },
  { id: 'r6', title: 'Dead Mountain: The Dyatlov Pass Incident', author: 'Donnie Eichar', type: 'Book', cluster: 'void' },
  { id: 'r7', title: 'The Witch (folklore lecture series)', author: 'Various', type: 'Course', cluster: 'violet' },
  { id: 'r8', title: 'Wonders of the Universe', author: 'BBC', type: 'Documentary', cluster: 'amber' },
  { id: 'r9', title: 'The Salem Witch Trials Reader', author: 'Frances Hill', type: 'Book', cluster: 'amber' },
  { id: 'r10', title: 'Lore', author: 'Aaron Mahnke', type: 'Podcast', cluster: 'violet' },
  { id: 'r11', title: 'The Codex Gigas Digitization Project', author: 'National Library of Sweden', type: 'Article', cluster: 'violet' },
  { id: 'r12', title: 'In the Shadow of the Moon', author: 'David Sington', type: 'Documentary', cluster: 'amber' },
  { id: 'r13', title: 'Frankenstein: The 1818 Text', author: 'Mary Shelley', type: 'Book', cluster: 'crimson' },
  { id: 'r14', title: 'The Voynich Manuscript: A Cipher Analysis', author: 'Cryptologia', type: 'Paper', cluster: 'violet' },
  { id: 'r15', title: 'Poltergeist & the Curse of Hollywood', author: 'Shudder', type: 'Documentary', cluster: 'crimson' },
  { id: 'r16', title: 'The MKUltra Declassified Files', author: 'CIA / FOIA', type: 'Article', cluster: 'void' },
];
