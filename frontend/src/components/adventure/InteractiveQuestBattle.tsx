import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  Coins,
  Flame,
  Zap,
  RotateCcw,
  Lightbulb,
  RefreshCw,
  Layers,
  Crown,
} from 'lucide-react';
import { useAdventure, Quest } from '../../context/AdventureContext';
import { useMontessori } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';
import {
  fetchDiverseQuestions,
  DynamicQuestion,
  QuestionTheme,
  THEME_CONFIG,
} from '../../services/aiQuestionService';

interface BattleProps {
  quest: Quest;
  onExit: () => void;
}

export const InteractiveQuestBattle: React.FC<BattleProps> = ({ quest, onExit }) => {
  const {
    addXp,
    addCoins,
    hearts,
    loseHeart,
    restoreHearts,
    completeQuest,
    streak,
  } = useAdventure();

  const { t } = useMontessori();

  // Thematic realm state
  const [theme, setTheme] = useState<QuestionTheme>('animals');

  // Dynamic question state
  const [questions, setQuestions] = useState<DynamicQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [combo, setCombo] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [battleFeedback, setBattleFeedback] = useState<'idle' | 'hit' | 'miss'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [enemyHp, setEnemyHp] = useState(100);
  const [isVictory, setIsVictory] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Load diverse AI questions with selected theme (5 Stages / Rounds)
  const loadQuestions = async (activeTheme: QuestionTheme = theme) => {
    setLoading(true);
    setSelectedOption(null);
    setBattleFeedback('idle');
    setShowHint(false);
    try {
      const result = await fetchDiverseQuestions(quest.type, 5, 'easy', activeTheme);
      setQuestions(result.questions);
      setIsAiGenerated(result.isAiGenerated);
    } catch (e) {
      // Handled inside service
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions(theme);
  }, [quest.id, theme]);

  const handleSwitchTheme = (newTheme: QuestionTheme) => {
    soundFX.playClick();
    setTheme(newTheme);
    setCurrentStep(0);
    setEnemyHp(100);
  };

  const currentQ = questions[currentStep] || questions[0];

  const handleSelect = (option: number | string) => {
    soundFX.playClick();
    setSelectedOption(option);
    setBattleFeedback('idle');
  };

  const handleAttack = () => {
    if (!currentQ || selectedOption === null) return;

    if (String(selectedOption) === String(currentQ.correctAnswer)) {
      // Hit Monster (20 HP per stage = 5 stages to defeat 100 HP)
      soundFX.playCoin();
      setBattleFeedback('hit');
      setCombo((prev) => prev + 1);
      setEnemyHp((prev) => Math.max(0, prev - 20));

      if (enemyHp - 20 <= 0 || currentStep >= questions.length - 1) {
        // Victory!
        soundFX.playLevelUp();
        setIsVictory(true);
        addXp(quest.xpReward);
        addCoins(quest.coinReward);
        completeQuest(quest.id, 3);
      } else {
        // Next step
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
          setSelectedOption(null);
          setBattleFeedback('idle');
          setShowHint(false);
        }, 1200);
      }
    } else {
      // Miss / Player Takes Damage (Zero Math Anxiety: clear hint automatically shown)
      const dead = loseHeart();
      setBattleFeedback('miss');
      setCombo(0);
      setShowHint(true);

      if (dead || hearts <= 1) {
        setIsGameOver(true);
      }
    }
  };

  const handleTryAgain = () => {
    soundFX.playClick();
    restoreHearts();
    setEnemyHp(100);
    setCurrentStep(0);
    setCombo(0);
    setSelectedOption(null);
    setBattleFeedback('idle');
    setShowHint(false);
    setIsGameOver(false);
    setIsVictory(false);
    loadQuestions(theme);
  };

  if (loading || !currentQ) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30 animate-spin">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="font-black text-lg text-white">
          {t('Menyiapkan Soal Bervariasi dengan AI Gemini...', 'Generating Diverse Questions with AI Gemini...')}
        </h3>
        <p className="text-xs text-slate-400">
          {t('Menyesuaikan tema dan karakter matematika unik...', 'Customizing math theme and visual prompts...')}
        </p>
      </div>
    );
  }

  const activeThemeConfig = THEME_CONFIG[theme];

  return (
    <div className="max-w-3xl mx-auto space-y-5 py-4">
      {/* Top Battle Header Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => {
            soundFX.playClick();
            onExit();
          }}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('Peta Quest', 'Quest Map')}</span>
        </button>

        {/* AI Gemini Status Pill */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full text-[11px] font-black bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>{isAiGenerated ? 'Gemini 1.5 AI' : 'Dynamic AI Math Engine'}</span>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              loadQuestions(theme);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            title="Generate Soal Baru (AI)"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-black text-indigo-400">
            {t('Tahap', 'Round')} {currentStep + 1} / {questions.length}
          </span>

          {combo > 1 && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              COMBO x{combo}!
            </span>
          )}
        </div>
      </div>

      {/* THEMATIC REALM SELECTOR PILLS */}
      <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-bold text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            {t('Pilih Tema Soal (Bervariasi):', 'Select Question Theme (Varied):')}
          </span>
          <span className="text-[11px] font-semibold text-indigo-400">
            {t(activeThemeConfig.nameId, activeThemeConfig.nameEn)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {(Object.keys(THEME_CONFIG) as QuestionTheme[]).map((themeKey) => {
            const conf = THEME_CONFIG[themeKey];
            const isSelected = theme === themeKey;
            return (
              <button
                key={themeKey}
                onClick={() => handleSwitchTheme(themeKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                <span>{conf.icon}</span>
                <span>{t(conf.nameId.split(' ')[1] || conf.nameId, conf.nameEn.split(' ')[1] || conf.nameEn)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Battle Canvas */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-indigo-500/30 relative overflow-hidden shadow-2xl space-y-6">
        {/* Monster / Boss Status Area */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            {/* Dynamic Stage Monster/Boss Avatar */}
            {(() => {
              let monsterIcon = '🤖';
              let monsterLabel = 'Guardian';

              if (quest.id === 'quest-boss-1') {
                monsterIcon = '🗿';
                monsterLabel = 'Boss: Reef Math Golem';
              } else if (quest.id === 'quest-boss-2') {
                monsterIcon = '🦁';
                monsterLabel = 'Boss: Primal Lion Titan';
              } else if (quest.id === 'quest-boss-3') {
                monsterIcon = '🐲';
                monsterLabel = 'Boss: Mana Crystal Dragon';
              } else if (quest.id === 'quest-boss-4') {
                monsterIcon = '🐙';
                monsterLabel = 'Boss: Abyssal Giant Kraken';
              } else if (quest.id === 'quest-boss-final') {
                monsterIcon = '👾';
                monsterLabel = 'Grand Boss: Cosmic Brain Overlord 👑';
              } else if (quest.bossQuest) {
                monsterIcon = '👾';
                monsterLabel = 'Stage Boss';
              } else if (theme === 'space') {
                monsterIcon = '🛸';
                monsterLabel = 'Cosmic Invader';
              } else if (theme === 'ocean') {
                monsterIcon = '🐬';
                monsterLabel = 'Ocean Sentinel';
              } else if (theme === 'animals') {
                monsterIcon = '🦊';
                monsterLabel = 'Forest Companion';
              } else if (theme === 'cooking') {
                monsterIcon = '🧑‍🍳';
                monsterLabel = 'Chef Puzzle Master';
              } else if (theme === 'fantasy') {
                monsterIcon = '🧙‍♂️';
                monsterLabel = 'Mystic Archmage';
              } else if (theme === 'montessori') {
                monsterIcon = '🪵';
                monsterLabel = 'Montessori Guardian';
              }

              return (
                <div className="flex items-center space-x-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border ${
                    quest.bossQuest
                      ? 'bg-gradient-to-tr from-rose-500/30 to-amber-500/30 border-rose-500/50 animate-pulse'
                      : 'bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border-indigo-500/30'
                  }`}>
                    {monsterIcon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                      {quest.bossQuest && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{monsterLabel}</span>
                    </p>
                    <h4 className="text-base font-black text-white">
                      {t(activeThemeConfig.nameId, activeThemeConfig.nameEn)}
                    </h4>
                    {currentQ.storyContextId && (
                      <p className="text-[11px] text-amber-300/90 italic mt-0.5 max-w-sm sm:max-w-md truncate">
                        "{t(currentQ.storyContextId, currentQ.storyContextEn || '')}"
                      </p>
                    )}
                  </div>
                </div>
              );
            })()}

          <div className="w-32 sm:w-48 space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-400">
              <span>HP</span>
              <span className="text-rose-400">{enemyHp} / 100</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 p-0.5 border border-slate-700">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${enemyHp}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quest Challenge Question */}
        <div className="text-center space-y-3 py-2">
          <h3 className="text-lg sm:text-2xl font-black text-white leading-snug">
            {t(currentQ.promptId, currentQ.promptEn)}
          </h3>

          {/* CPA STAGE 2: PICTORIAL ITEMS DISPLAY (Emojis / Icons) */}
          {currentQ.pictorialItemA && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-4">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap gap-1.5 justify-center max-w-xs shadow-inner">
                {Array.from({ length: currentQ.pictorialItemA.count }).map((_, idx) => (
                  <span
                    key={idx}
                    className="text-2xl sm:text-3xl animate-bounce"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    {currentQ.pictorialItemA?.icon}
                  </span>
                ))}
              </div>

              <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-black text-lg">
                +
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap gap-1.5 justify-center max-w-xs shadow-inner">
                {Array.from({ length: currentQ.pictorialItemB?.count || 1 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="text-2xl sm:text-3xl animate-bounce"
                    style={{ animationDelay: `${idx * 80 + 100}ms` }}
                  >
                    {currentQ.pictorialItemB?.icon || '✨'}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Concrete Montessori: Number Rods Representation */}
          {currentQ.visualRodA && !currentQ.pictorialItemA && (
            <div className="max-w-md mx-auto space-y-2.5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>{t('Batang A', 'Rod A')} ({currentQ.visualRodA} {t('Satuan', 'Units')})</span>
                <span className="text-rose-400">Merah - Biru</span>
              </div>
              <div className="flex rounded-lg h-8 overflow-hidden border border-slate-700 shadow">
                {Array.from({ length: currentQ.visualRodA }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 text-[11px] font-black text-white flex items-center justify-center border-r border-black/20 ${
                      i % 2 === 0 ? 'bg-rose-500' : 'bg-blue-500'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {currentQ.visualRodB && (
                <>
                  <p className="text-indigo-400 font-extrabold text-sm text-center">+</p>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>{t('Batang B', 'Rod B')} ({currentQ.visualRodB} {t('Satuan', 'Units')})</span>
                    <span className="text-blue-400">Merah - Biru</span>
                  </div>
                  <div className="flex rounded-lg h-8 overflow-hidden border border-slate-700 shadow">
                    {Array.from({ length: currentQ.visualRodB }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 text-[11px] font-black text-white flex items-center justify-center border-r border-black/20 ${
                          i % 2 === 0 ? 'bg-rose-500' : 'bg-blue-500'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Concrete Montessori: Golden Beads Representation */}
          {currentQ.beadsHundreds !== undefined && !currentQ.pictorialItemA && (
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-around text-center">
              <div>
                <p className="text-[11px] font-bold text-amber-400 uppercase">Ratusan (100)</p>
                <p className="text-2xl font-black text-amber-300">{currentQ.beadsHundreds}</p>
              </div>
              <div className="text-slate-600 font-bold">+</div>
              <div>
                <p className="text-[11px] font-bold text-amber-400 uppercase">Puluhan (10)</p>
                <p className="text-2xl font-black text-amber-300">{currentQ.beadsTens}</p>
              </div>
              <div className="text-slate-600 font-bold">+</div>
              <div>
                <p className="text-[11px] font-bold text-amber-400 uppercase">Satuan (1)</p>
                <p className="text-2xl font-black text-amber-300">{currentQ.beadsUnits}</p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Answer Choices */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            return (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className={`h-16 rounded-2xl font-black text-xl sm:text-2xl transition-all shadow-md active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 ring-4 ring-amber-400/50 scale-105'
                    : 'bg-slate-800 text-white hover:bg-slate-700 border-2 border-slate-700 hover:border-indigo-400'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Attack Button & Hint Button (Zero Math Anxiety Policy) */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleAttack}
            disabled={selectedOption === null}
            className={`px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
              selectedOption === null
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-90 text-white shadow-indigo-600/30'
            }`}
          >
            <Zap className="w-5 h-5 text-amber-300" />
            <span>{t('Serang / Kirim Jawaban! ⚔️', 'Attack / Submit Answer! ⚔️')}</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setShowHint((prev) => !prev);
            }}
            className="px-4 py-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>{t('Petunjuk Pintar AI', 'Smart AI Hint')}</span>
          </button>
        </div>

        {/* Smart Hint Box (Zero Math Anxiety) */}
        {showHint && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs leading-relaxed animate-in fade-in duration-200 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-300">{t('Petunjuk Guru Montessori:', 'Montessori Guide Hint:')}</p>
              <p className="mt-1">{t(currentQ.hintId, currentQ.hintEn)}</p>
            </div>
          </div>
        )}

        {/* Hit / Miss Flash Feedback */}
        {battleFeedback === 'hit' && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-bold text-xs animate-bounce">
            ⚡ CRITICAL HIT! {t('Jawaban Tepat!', 'Correct Hit!')} (+50 XP)
          </div>
        )}

        {battleFeedback === 'miss' && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-center font-bold text-xs">
            💥 {t('Jawaban belum pas. Cek petunjuk pintar di atas!', 'Not quite right. Check the smart hint above!')}
          </div>
        )}
      </div>

      {/* Victory Modal */}
      {isVictory && (
        <div className="p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/50 text-center space-y-5 shadow-2xl animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-3xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto border-2 border-amber-400/40 text-4xl shadow-lg">
            🏆
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {t('VICTORY! QUEST SELESAI ⋆˙⟡', 'VICTORY! QUEST CLEARED ⋆˙⟡')}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {t(
              'Hebat! Kamu berhasil menyelesaikan tantangan bertema bervariasi dari AI Gemini.',
              'Awesome! You cleared the varied thematic challenges generated with AI Gemini.'
            )}
          </p>

          <div className="flex justify-center gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 min-w-32">
              <p className="text-xs text-slate-400">Hadiah XP</p>
              <p className="text-xl font-black text-indigo-400">+{quest.xpReward} XP</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 min-w-32">
              <p className="text-xs text-slate-400">Koin Diperoleh</p>
              <p className="text-xl font-black text-amber-400">+{quest.coinReward} 🪙</p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                soundFX.playClick();
                handleTryAgain();
              }}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition"
            >
              {t('Mainkan Lagi (Soal Baru AI)', 'Play Again (New AI Questions)')}
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                onExit();
              }}
              className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              {t('Kembali ke Peta Quest', 'Return to Quest Map')}
            </button>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="p-8 rounded-3xl bg-slate-900 border-2 border-rose-500/50 text-center space-y-5 shadow-2xl animate-in zoom-in-95">
          <div className="text-5xl">💔</div>
          <h3 className="text-2xl font-black text-rose-400">
            {t('GAME OVER: HP Habis!', 'GAME OVER: Out of Hearts!')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {t(
              'Jangan menyerah! Latihan sensorik Montessori membantu otak berkembang.',
              'Do not give up! Montessori sensory practice helps your brain grow.'
            )}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleTryAgain}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('Coba Lagi (Isi HP & Soal Baru)', 'Try Again (Refill HP & New Questions)')}</span>
            </button>
            <button
              onClick={onExit}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              {t('Kembali ke Peta', 'Back to Map')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
