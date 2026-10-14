import React from 'react';
import {
  Sparkles,
  Star,
  Lock,
  Play,
  CheckCircle2,
  Sword,
  Shield,
  Zap,
  Flame,
  Award,
  Crown,
} from 'lucide-react';
import { useAdventure, Quest } from '../../context/AdventureContext';
import { useMontessori } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';

const QUESTS: Quest[] = [
  // ==========================================
  // STAGE 1: Kepulauan Aritmatika & Sensori Montessori
  // ==========================================
  {
    id: 'quest-rods-1',
    world: 1,
    titleId: '🪵 Batang Angka: Segmen Merah-Biru',
    titleEn: '🪵 Number Rods: Red & Blue Segments',
    subtitleId: 'Kuantitas 1-10 konkret sensori Montessori',
    subtitleEn: 'Concrete sensory quantities 1-10',
    type: 'rods',
    xpReward: 100,
    coinReward: 25,
    requiredLevel: 1,
    stars: 3,
    isCompleted: false,
  },
  {
    id: 'quest-beads-1',
    world: 1,
    titleId: '✨ Gua Manik Emas: Nilai Tempat',
    titleEn: '✨ Golden Beads Cave: Place Value',
    subtitleId: 'Satuan, puluhan, dan ratusan desimal',
    subtitleEn: 'Units, tens, and hundreds decimal values',
    type: 'beads',
    xpReward: 120,
    coinReward: 30,
    requiredLevel: 1,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-speed-1',
    world: 1,
    titleId: '🚀 Ujian Kilat: Galaksi Aritmatika',
    titleEn: '🚀 Speed Trials: Galaxy Arithmetic',
    subtitleId: 'Hitung cepat 5 ronde melintasi bintang',
    subtitleEn: 'Fast calculation across the stars',
    type: 'speed',
    xpReward: 150,
    coinReward: 40,
    requiredLevel: 1,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-boss-1',
    world: 1,
    titleId: '👾 Boss 1: Math Golem Pulau Karang',
    titleEn: '👾 Boss 1: Reef Math Golem',
    subtitleId: 'Kalahkan penjaga kepulauan dengan 5 kombo hitung!',
    subtitleEn: 'Defeat the Island Guardian with 5 calculation hits!',
    type: 'speed',
    xpReward: 250,
    coinReward: 80,
    requiredLevel: 1,
    stars: 0,
    isCompleted: false,
    bossQuest: true,
  },

  // ==========================================
  // STAGE 2: Rimba Deret & Operator Satwa
  // ==========================================
  {
    id: 'quest-op-2',
    world: 2,
    titleId: '🐾 Misteri Operator Rimba Hewan',
    titleEn: '🐾 Safari Mystery of Missing Operators',
    subtitleId: 'Tebak tanda +, -, *, atau / bersama satwa rimba',
    subtitleEn: 'Deduce the missing math sign in the safari',
    type: 'missing_op',
    xpReward: 160,
    coinReward: 45,
    requiredLevel: 2,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-seq-2',
    world: 2,
    titleId: '🌿 Lembah Deret Angka Berirama',
    titleEn: '🌿 Rhythmic Sequence River',
    subtitleId: 'Temukan pola loncatan bilangan di belantara hijau',
    subtitleEn: 'Discover sequence skip patterns in the wild',
    type: 'sequence',
    xpReward: 180,
    coinReward: 50,
    requiredLevel: 2,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-speed-2',
    world: 2,
    titleId: '⚡ Refleks Satwa Kilat Rimba',
    titleEn: '⚡ Safari Lightning Reflexes',
    subtitleId: 'Tangkas berhitung secepat cheetah berlari',
    subtitleEn: 'Swift arithmetic as fast as a running cheetah',
    type: 'speed',
    xpReward: 190,
    coinReward: 55,
    requiredLevel: 2,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-boss-2',
    world: 2,
    titleId: '🦁 Boss 2: Titan Singa Penjaga Rimba',
    titleEn: '🦁 Boss 2: Primal Lion Guardian',
    subtitleId: 'Hadapi auman Titan Rimba dengan deduksi tepat!',
    subtitleEn: 'Face the Primal Guardian with sharp deductions!',
    type: 'missing_op',
    xpReward: 300,
    coinReward: 100,
    requiredLevel: 2,
    stars: 0,
    isCompleted: false,
    bossQuest: true,
  },

  // ==========================================
  // STAGE 3: Kuil Kristal Aljabar & Timbangan Fantasi
  // ==========================================
  {
    id: 'quest-alg-3',
    world: 3,
    titleId: '🏰 Kuil Timbangan Aljabar Fantasi',
    titleEn: '🏰 Fantasy Shrine of Balance & Logic',
    subtitleId: 'Seimbangkan kristal sihir dan cari nilai x tersembunyi',
    subtitleEn: 'Balance magic crystals and solve for x',
    type: 'algebra',
    xpReward: 220,
    coinReward: 65,
    requiredLevel: 3,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-missing-3',
    world: 3,
    titleId: '🔮 Labirin Operator Kristal Mantra',
    titleEn: '🔮 Crystal Maze of Mystic Signs',
    subtitleId: 'Ungkap formula mantra magis matematika kuno',
    subtitleEn: 'Decode ancient arithmetic spell formulas',
    type: 'missing_op',
    xpReward: 230,
    coinReward: 70,
    requiredLevel: 3,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-seq-3',
    world: 3,
    titleId: '💎 Deret Kristal Kembar Bertingkat',
    titleEn: '💎 Multi-Step Crystal Sequences',
    subtitleId: 'Pecahkan deret kelipatan dan tangga magis',
    subtitleEn: 'Crack geometric patterns and crystal stairs',
    type: 'sequence',
    xpReward: 240,
    coinReward: 75,
    requiredLevel: 3,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-boss-3',
    world: 3,
    titleId: '🐲 Boss 3: Naga Penjaga Kristal Mana',
    titleEn: '🐲 Boss 3: Mana Crystal Dragon',
    subtitleId: 'Gunakan aljabar untuk menembus perisai sang naga!',
    subtitleEn: 'Use algebra logic to pierce the dragon shield!',
    type: 'algebra',
    xpReward: 350,
    coinReward: 120,
    requiredLevel: 3,
    stars: 0,
    isCompleted: false,
    bossQuest: true,
  },

  // ==========================================
  // STAGE 4: Palung Samudera Estimasi & Logika
  // ==========================================
  {
    id: 'quest-est-4',
    world: 4,
    titleId: '🌊 Kedalaman Estimasi Samudera',
    titleEn: '🌊 Deep Ocean Estimation Depths',
    subtitleId: 'Perkirakan jarak sonar dan kelompok biota laut terdekat',
    subtitleEn: 'Estimate sonar distance and nearest marine groups',
    type: 'estimation',
    xpReward: 260,
    coinReward: 80,
    requiredLevel: 4,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-ocean-speed',
    world: 4,
    titleId: '🐬 Arus Cepat Lumba-lumba Mariana',
    titleEn: '🐬 Mariana Dolphin Rapid Currents',
    subtitleId: 'Kalkulasi kilat menghindari pusaran air laut dalam',
    subtitleEn: 'Rapid calculation evading deep ocean whirlpools',
    type: 'speed',
    xpReward: 270,
    coinReward: 85,
    requiredLevel: 4,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-ocean-alg',
    world: 4,
    titleId: '🔱 Sandi Aljabar Atlantis Kuno',
    titleEn: '🔱 Ancient Atlantis Algebraic Code',
    subtitleId: 'Selesaikan persamaan trisula raja laut',
    subtitleEn: 'Solve the Sea King trident algebraic equations',
    type: 'algebra',
    xpReward: 280,
    coinReward: 90,
    requiredLevel: 4,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-boss-4',
    world: 4,
    titleId: '🐙 Boss 4: Kraken Raksasa Palung Abisal',
    titleEn: '🐙 Boss 4: Abyssal Giant Kraken',
    subtitleId: 'Tundukkan 8 tentakel Kraken dengan taksiran akurat!',
    subtitleEn: 'Subdue 8 tentacles with accurate estimation!',
    type: 'estimation',
    xpReward: 400,
    coinReward: 150,
    requiredLevel: 4,
    stars: 0,
    isCompleted: false,
    bossQuest: true,
  },

  // ==========================================
  // STAGE 5: Galaksi Kosmik & Matriks Raja Otak
  // ==========================================
  {
    id: 'quest-matrix-5',
    world: 5,
    titleId: '🌌 Gerbang Matriks Konstelasi Bintang',
    titleEn: '🌌 Stellar Constellation Matrix Gate',
    subtitleId: 'Pecahkan relasi baris dan kolom kisi koordinat bintang',
    subtitleEn: 'Solve row and column grids across starry coordinates',
    type: 'matrix',
    xpReward: 320,
    coinReward: 100,
    requiredLevel: 5,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-cosmic-est',
    world: 5,
    titleId: '🪐 Navigasi Orbit & Kecepatan Cahaya',
    titleEn: '🪐 Orbit Navigation & Light Warp',
    subtitleId: 'Estimasi lintasan roket menghindari sabuk asteroid',
    subtitleEn: 'Estimate rocket trajectory avoiding asteroid belts',
    type: 'estimation',
    xpReward: 330,
    coinReward: 110,
    requiredLevel: 5,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-cosmic-alg',
    world: 5,
    titleId: '⚡ Aljabar Singularitas Lubang Hitam',
    titleEn: '⚡ Black Hole Singularity Algebra',
    subtitleId: 'Seimbangkan gravitasi kuantum persamaan kosmik',
    subtitleEn: 'Balance quantum gravity of cosmic equations',
    type: 'algebra',
    xpReward: 350,
    coinReward: 120,
    requiredLevel: 5,
    stars: 0,
    isCompleted: false,
  },
  {
    id: 'quest-boss-final',
    world: 5,
    titleId: '👾 Grand Boss: Raja Otak Kosmik 👑',
    titleEn: '👾 Grand Boss: Cosmic Brain Overlord 👑',
    subtitleId: 'Ujian pamungkas 5 ronde taklukan penguasa semesta!',
    subtitleEn: 'Ultimate 5-round final battle to conquer the cosmos!',
    type: 'matrix',
    xpReward: 600,
    coinReward: 300,
    requiredLevel: 5,
    stars: 0,
    isCompleted: false,
    bossQuest: true,
  },
];

interface WorldMapProps {
  onSelectQuest: (quest: Quest) => void;
}

export const WorldMapQuestBoard: React.FC<WorldMapProps> = ({ onSelectQuest }) => {
  const { level, completedQuests, streak } = useAdventure();
  const { t } = useMontessori();

  const handleStart = (quest: Quest) => {
    soundFX.playClick();
    onSelectQuest(quest);
  };

  // World meta descriptions
  const WORLDS = [
    {
      num: 1,
      badge: 'STAGE 1',
      emoji: '🏝️',
      nameId: 'Dunia 1: Kepulauan Aritmatika & Sensori',
      nameEn: 'World 1: Arithmetic & Sensory Archipelago',
      descId: 'Kuasai dasar konkret sensori batang angka dan nilai tempat manik emas.',
      descEn: 'Master concrete number rods and golden beads place values.',
      gradient: 'from-cyan-900/40 via-slate-900 to-indigo-950/40',
      border: 'border-cyan-500/30',
      tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      num: 2,
      badge: 'STAGE 2',
      emoji: '🌲',
      nameId: 'Dunia 2: Rimba Deret & Operator Satwa',
      nameEn: 'World 2: Forest of Patterns & Operators',
      descId: 'Pecahkan misteri operator matematika dan temukan pola bilangan tersembunyi.',
      descEn: 'Deduce hidden math operators and continuous sequence progressions.',
      gradient: 'from-emerald-900/40 via-slate-900 to-teal-950/40',
      border: 'border-emerald-500/30',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      num: 3,
      badge: 'STAGE 3',
      emoji: '🏰',
      nameId: 'Dunia 3: Kuil Kristal Aljabar Fantasi',
      nameEn: 'World 3: Fantasy Crystal Algebra Shrine',
      descId: 'Seimbangkan timbangan kristal magis dan pecahkan persamaan nilai x.',
      descEn: 'Balance magical crystal scales and solve algebraic equations for x.',
      gradient: 'from-purple-900/40 via-slate-900 to-violet-950/40',
      border: 'border-purple-500/30',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      num: 4,
      badge: 'STAGE 4',
      emoji: '🌊',
      nameId: 'Dunia 4: Palung Samudera Estimasi & Logika',
      nameEn: 'World 4: Deep Ocean Estimation & Logic',
      descId: 'Latih intuisi estimasi numerik dan taksiran jarak bersama biota laut dalam.',
      descEn: 'Train numerical estimation intuition and sonar distance with deep sea fauna.',
      gradient: 'from-blue-900/40 via-slate-900 to-cyan-950/40',
      border: 'border-blue-500/30',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    {
      num: 5,
      badge: 'STAGE 5 (FINAL)',
      emoji: '🚀',
      nameId: 'Dunia 5: Galaksi Kosmik & Matriks Raja Otak',
      nameEn: 'World 5: Cosmic Galaxy & Matrix Overlord',
      descId: 'Tantangan puncak matriks koordinat konstelasi dan hadapi Grand Boss Kosmik!',
      descEn: 'Peak matrix coordinate challenge and duel against the Cosmic Brain Overlord!',
      gradient: 'from-amber-900/40 via-purple-950/50 to-slate-900',
      border: 'border-amber-500/40',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Hero Adventure Banner (Codédex Style) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border-2 border-indigo-500/40 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-400/10 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START YOUR 5-STAGE MATH EXPEDITION ⋆˙⟡</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {t(
              'Jelajahi 5 Dunia Matematika, Taklukkan Raja Otak Kosmik!',
              'Explore 5 Math Worlds, Defeat the Cosmic Brain Overlord!'
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t(
              'Mulai dari sensori konkret Montessori, hutan pola, kuil aljabar, palung samudera, hingga galaksi kosmik! Selesaikan tiap stage, kalahkan boss 5 ronde, dan raih mahkota tertinggi.',
              'From concrete Montessori manipulatives, pattern forests, algebra shrines, oceanic estimations, to the cosmic galaxy! Clear each stage, defeat 5-round bosses, and claim the grand crown.'
            )}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{streak} {t('Hari Berturut-turut', 'Days Daily Streak')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{completedQuests.length} / {QUESTS.length} {t('Quest Selesai', 'Quests Cleared')}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Level {level} Explorer</span>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER ALL 5 STAGES / WORLDS */}
      {WORLDS.map((w) => {
        const worldQuests = QUESTS.filter((q) => q.world === w.num);
        const isWorldUnlocked = level >= w.num;

        return (
          <div key={w.num} className="space-y-4">
            {/* World Header Card */}
            <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${w.gradient} border ${w.border} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg`}>
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-2xl shadow-md">
                  {w.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${w.tagColor}`}>
                      {w.badge}
                    </span>
                    {!isWorldUnlocked && (
                      <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        {t(`Buka di Level ${w.num}`, `Unlocks at Level ${w.num}`)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                    {t(w.nameId, w.nameEn)}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {t(w.descId, w.descEn)}
                  </p>
                </div>
              </div>

              {/* Progress Count */}
              <div className="text-xs font-bold text-slate-400 flex items-center gap-2 self-end sm:self-center">
                <span>
                  {worldQuests.filter((q) => completedQuests.includes(q.id)).length} / {worldQuests.length} Cleared
                </span>
              </div>
            </div>

            {/* Quest Grid for this World */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {worldQuests.map((quest) => {
                const isCompleted = completedQuests.includes(quest.id);
                const isLocked = level < quest.requiredLevel;

                return (
                  <div
                    key={quest.id}
                    className={`p-5 rounded-2xl border-2 flex flex-col justify-between space-y-4 transition-all ${
                      quest.bossQuest
                        ? 'bg-gradient-to-b from-rose-950/40 via-slate-900 to-amber-950/30 border-rose-500/50 shadow-lg shadow-rose-950/30'
                        : isCompleted
                        ? 'bg-slate-900/90 border-emerald-500/40'
                        : isLocked
                        ? 'bg-slate-950/60 border-slate-800 opacity-60'
                        : 'bg-slate-900/90 border-slate-700 hover:border-indigo-500 shadow-md'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                            quest.bossQuest
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse'
                              : isCompleted
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                          }`}
                        >
                          {quest.bossQuest ? '⚔️ BOSS QUEST' : `LEVEL ${quest.requiredLevel}`}
                        </span>

                        {/* Stars */}
                        <div className="flex items-center space-x-1 text-amber-400">
                          <Star className={`w-3.5 h-3.5 ${isCompleted ? 'fill-amber-400' : 'text-slate-600'}`} />
                          <Star className={`w-3.5 h-3.5 ${isCompleted ? 'fill-amber-400' : 'text-slate-600'}`} />
                          <Star className={`w-3.5 h-3.5 ${isCompleted ? 'fill-amber-400' : 'text-slate-600'}`} />
                        </div>
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-white leading-tight">
                        {t(quest.titleId, quest.titleEn)}
                      </h4>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {t(quest.subtitleId, quest.subtitleEn)}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                        <span className="text-indigo-400 font-mono">+{quest.xpReward} XP</span>
                        <span>•</span>
                        <span className="text-amber-400 font-mono">+{quest.coinReward} 🪙</span>
                      </div>

                      <button
                        onClick={() => handleStart(quest)}
                        disabled={isLocked}
                        className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition active:scale-95 ${
                          isLocked
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : quest.bossQuest
                            ? 'bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-md shadow-rose-600/30'
                            : isCompleted
                            ? 'bg-emerald-600/80 hover:bg-emerald-500 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                        }`}
                      >
                        {isLocked ? (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Lv. {quest.requiredLevel}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{isCompleted ? t('Ulangi', 'Replay') : t('Mainkan', 'Start')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

