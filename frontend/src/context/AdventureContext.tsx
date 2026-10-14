import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFX } from '../utils/audio';

export interface Badge {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  icon: string;
  unlocked: boolean;
}

export interface Quest {
  id: string;
  world: number;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  type: 'rods' | 'beads' | 'speed' | 'missing_op' | 'sequence' | 'algebra' | 'estimation' | 'matrix';
  xpReward: number;
  coinReward: number;
  requiredLevel: number;
  stars: number; // 0..3
  isCompleted: boolean;
  bossQuest?: boolean;
}

interface AdventureContextType {
  name: string;
  setName: (name: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  title: string;
  completedQuests: string[];
  badges: Badge[];
  activeQuestId: string | null;
  setActiveQuestId: (id: string | null) => void;
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  loseHeart: () => boolean; // returns true if game over (hearts === 0)
  restoreHearts: () => void;
  completeQuest: (questId: string, stars: number) => void;
  resetAdventure: () => void;
}

const STORAGE_KEY = 'codedex_brain_adventure_v1';

const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-1',
    nameId: 'Langkah Awal ⋆˙⟡',
    nameEn: 'First Steps ⋆˙⟡',
    descId: 'Memulai petualangan matematika pertama kamu!',
    descEn: 'Started your very first math adventure!',
    icon: '🌱',
    unlocked: true,
  },
  {
    id: 'badge-2',
    nameId: 'Master Batang Angka',
    nameEn: 'Rods Master',
    descId: 'Menyelesaikan quest manipulatif batang angka konkret.',
    descEn: 'Completed the concrete number rods quest.',
    icon: '🪵',
    unlocked: false,
  },
  {
    id: 'badge-3',
    nameId: 'Pemburu Manik Emas',
    nameEn: 'Golden Beads Hunter',
    descId: 'Menguasai nilai tempat satuan, puluhan, dan ratusan.',
    descEn: 'Mastered units, tens, and hundreds place value.',
    icon: '✨',
    unlocked: false,
  },
  {
    id: 'badge-4',
    nameId: 'Kilat Aritmatika ⚡',
    nameEn: 'Lightning Math ⚡',
    descId: 'Mencapai combo 5x berturut-turut dalam hitung cepat.',
    descEn: 'Achieved a 5x combo in speed arithmetic.',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: 'badge-5',
    nameId: 'Ksatria Logika 🛡️',
    nameEn: 'Logic Knight 🛡️',
    descId: 'Mencapai Level 3 dan mengalahkan Boss Kuil Aljabar.',
    descEn: 'Reached Level 3 and cleared the Algebra Shrine.',
    icon: '👑',
    unlocked: false,
  },
  {
    id: 'badge-6',
    nameId: 'Penjelajah Samudera 🌊',
    nameEn: 'Ocean Explorer 🌊',
    descId: 'Menyelesaikan Stage 4: Palung Samudera Estimasi & Logika.',
    descEn: 'Cleared Stage 4: Ocean Deep Estimation & Logic.',
    icon: '🌊',
    unlocked: false,
  },
  {
    id: 'badge-7',
    nameId: 'Grand Champion Kosmik 🚀',
    nameEn: 'Cosmic Grand Champion 🚀',
    descId: 'Menyelesaikan Stage 5 dan mengalahkan Boss Raja Otak Kosmik!',
    descEn: 'Cleared Stage 5 and defeated the Cosmic Brain Overlord!',
    icon: '🏆',
    unlocked: false,
  },
];

const AdventureContext = createContext<AdventureContextType | undefined>(undefined);

export const AdventureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [name, setNameState] = useState<string>('Math Explorer');
  const [avatar, setAvatarState] = useState<string>('🧙‍♂️');
  const [level, setLevel] = useState<number>(1);
  const [xp, setXp] = useState<number>(120);
  const [coins, setCoins] = useState<number>(85);
  const [hearts, setHearts] = useState<number>(3);
  const [streak, setStreak] = useState<number>(4);
  const [completedQuests, setCompletedQuests] = useState<string[]>(['quest-1']);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [activeQuestId, setActiveQuestId] = useState<string | null>(null);

  const maxHearts = 3;
  const maxXp = level * 250;

  // Title calculation according to level (RPG ranks)
  const getPlayerTitle = (lvl: number) => {
    if (lvl >= 5) return 'Archmage of Logic 🌟';
    if (lvl >= 4) return 'Math Sorcerer 🔮';
    if (lvl >= 3) return 'Logic Knight 🛡️';
    if (lvl >= 2) return 'Arithmetic Apprentice 📜';
    return 'Novice Adventurer 🎒';
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setNameState(parsed.name);
        if (parsed.avatar) setAvatarState(parsed.avatar);
        if (parsed.level) setLevel(parsed.level);
        if (parsed.xp !== undefined) setXp(parsed.xp);
        if (parsed.coins !== undefined) setCoins(parsed.coins);
        if (parsed.hearts !== undefined) setHearts(parsed.hearts);
        if (parsed.streak !== undefined) setStreak(parsed.streak);
        if (parsed.completedQuests) setCompletedQuests(parsed.completedQuests);
        if (parsed.badges) setBadges(parsed.badges);
      }
    } catch (e) {}
  }, []);

  // Save on updates
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          name,
          avatar,
          level,
          xp,
          coins,
          hearts,
          streak,
          completedQuests,
          badges,
        })
      );
    } catch (e) {}
  }, [name, avatar, level, xp, coins, hearts, streak, completedQuests, badges]);

  const addXp = (amount: number) => {
    setXp((prevXp) => {
      let newXp = prevXp + amount;
      let curLevel = level;
      let limit = curLevel * 250;

      while (newXp >= limit) {
        newXp -= limit;
        curLevel += 1;
        limit = curLevel * 250;
        soundFX.playSuccess();
        // Unlock Knight badge if level >= 3
        if (curLevel >= 3) {
          setBadges((bList) =>
            bList.map((b) => (b.id === 'badge-5' ? { ...b, unlocked: true } : b))
          );
        }
      }
      setLevel(curLevel);
      return newXp;
    });
  };

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  const loseHeart = (): boolean => {
    soundFX.playWrong();
    let isDead = false;
    setHearts((prev) => {
      const next = Math.max(0, prev - 1);
      if (next === 0) isDead = true;
      return next;
    });
    return isDead;
  };

  const restoreHearts = () => {
    setHearts(maxHearts);
  };

  const completeQuest = (questId: string, stars: number) => {
    soundFX.playSuccess();
    if (!completedQuests.includes(questId)) {
      setCompletedQuests((prev) => [...prev, questId]);
    }
    if (questId.includes('rods')) {
      setBadges((bList) =>
        bList.map((b) => (b.id === 'badge-2' ? { ...b, unlocked: true } : b))
      );
    }
    if (questId.includes('beads')) {
      setBadges((bList) =>
        bList.map((b) => (b.id === 'badge-3' ? { ...b, unlocked: true } : b))
      );
    }
    if (questId.includes('speed')) {
      setBadges((bList) =>
        bList.map((b) => (b.id === 'badge-4' ? { ...b, unlocked: true } : b))
      );
    }
    if (questId.includes('ocean') || questId.includes('est-4')) {
      setBadges((bList) =>
        bList.map((b) => (b.id === 'badge-6' ? { ...b, unlocked: true } : b))
      );
    }
    if (questId.includes('boss-final') || questId.includes('cosmic-5')) {
      setBadges((bList) =>
        bList.map((b) => (b.id === 'badge-7' ? { ...b, unlocked: true } : b))
      );
    }
  };

  const resetAdventure = () => {
    localStorage.removeItem(STORAGE_KEY);
    setNameState('Math Explorer');
    setAvatarState('🧙‍♂️');
    setLevel(1);
    setXp(0);
    setCoins(50);
    setHearts(3);
    setStreak(1);
    setCompletedQuests([]);
    setBadges(INITIAL_BADGES);
  };

  return (
    <AdventureContext.Provider
      value={{
        name,
        setName: setNameState,
        avatar,
        setAvatar: setAvatarState,
        level,
        xp,
        maxXp,
        coins,
        hearts,
        maxHearts,
        streak,
        title: getPlayerTitle(level),
        completedQuests,
        badges,
        activeQuestId,
        setActiveQuestId,
        addXp,
        addCoins,
        loseHeart,
        restoreHearts,
        completeQuest,
        resetAdventure,
      }}
    >
      {children}
    </AdventureContext.Provider>
  );
};

export const useAdventure = () => {
  const context = useContext(AdventureContext);
  if (!context) {
    throw new Error('useAdventure must be used within an AdventureProvider');
  }
  return context;
};
