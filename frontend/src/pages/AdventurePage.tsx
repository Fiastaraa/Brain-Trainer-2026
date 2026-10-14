import React, { useState } from 'react';
import { AdventureNavbar } from '../components/adventure/AdventureNavbar';
import { WorldMapQuestBoard } from '../components/adventure/WorldMapQuestBoard';
import { InteractiveQuestBattle } from '../components/adventure/InteractiveQuestBattle';
import { AdventureProfileModal } from '../components/adventure/AdventureProfileModal';
import { useAdventure, Quest } from '../context/AdventureContext';

export const AdventurePage: React.FC = () => {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState<'profile' | 'badges'>('profile');

  const handleOpenProfile = () => {
    setModalView('profile');
    setModalOpen(true);
  };

  const handleOpenBadges = () => {
    setModalView('badges');
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Codédex-inspired RPG HUD Navbar */}
      <AdventureNavbar
        onOpenProfile={handleOpenProfile}
        onOpenBadges={handleOpenBadges}
      />

      {/* Main Adventure Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {selectedQuest ? (
          <InteractiveQuestBattle
            quest={selectedQuest}
            onExit={() => setSelectedQuest(null)}
          />
        ) : (
          <WorldMapQuestBoard onSelectQuest={(q) => setSelectedQuest(q)} />
        )}
      </main>

      {/* Character Profile & Badges Modal */}
      <AdventureProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        activeView={modalView}
      />
    </div>
  );
};
