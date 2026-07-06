import { AnimatePresence, motion } from 'motion/react';
import { VaultProvider, useVault } from './lib/vault-context';
import { Compass } from './components/Compass';
import { ConstellationTrail, ReturnToGalaxy } from './components/RoomChrome';
import { GrandEntrance } from './rooms/GrandEntrance';
import { HallOfDomains } from './rooms/HallOfDomains';
import { KnowledgeGalaxy } from './rooms/KnowledgeGalaxy';
import { TopicChamber } from './rooms/TopicChamber';
import { Archive } from './rooms/Archive';
import { Observatory } from './rooms/Observatory';
import { Timeline } from './rooms/Timeline';
import { Library } from './rooms/Library';
import { FutureQuestions } from './rooms/FutureQuestions';
import { Nexus } from './rooms/Nexus';

function CurrentRoom() {
  const { room, activeTopicId } = useVault();
  switch (room) {
    case 'entrance':
      return <GrandEntrance />;
    case 'domains':
      return <HallOfDomains />;
    case 'galaxy':
      return <KnowledgeGalaxy />;
    case 'chamber':
      return <TopicChamber key={activeTopicId} />;
    case 'archive':
      return <Archive />;
    case 'observatory':
      return <Observatory />;
    case 'timeline':
      return <Timeline />;
    case 'library':
      return <Library />;
    case 'questions':
      return <FutureQuestions />;
    case 'nexus':
      return <Nexus />;
    default:
      return <GrandEntrance />;
  }
}

function VaultShell() {
  const { room } = useVault();
  return (
    <div className="vault-root relative min-h-screen w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={room}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <CurrentRoom />
        </motion.div>
      </AnimatePresence>

      <ConstellationTrail />
      <ReturnToGalaxy />
      <Compass />
    </div>
  );
}

export default function App() {
  return (
    <VaultProvider>
      <VaultShell />
    </VaultProvider>
  );
}
