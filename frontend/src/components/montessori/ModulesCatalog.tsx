import React, { useEffect, useState } from 'react';
import { Ruler, Coins, Zap, Palette, ArrowRight, Sparkles } from 'lucide-react';
import { useMontessori } from '../../context/MontessoriContext';
import api from '../../services/api';
import { soundFX } from '../../utils/audio';

interface GameModule {
  id: string;
  code: string;
  nameId: string;
  nameEn: string;
  descriptionId: string;
  descriptionEn: string;
  category: string;
  level: number;
  icon: string;
}

export const ModulesCatalog: React.FC = () => {
  const { t, setActiveTab } = useMontessori();
  const [modules, setModules] = useState<GameModule[]>([]);

  useEffect(() => {
    api
      .get('/modules')
      .then((res) => {
        if (res.data?.data) {
          setModules(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const getModuleIcon = (code: string) => {
    switch (code) {
      case 'number_rods':
        return <Ruler className="w-6 h-6 text-rose-400" />;
      case 'golden_beads':
        return <Coins className="w-6 h-6 text-amber-400" />;
      case 'mental_math':
        return <Zap className="w-6 h-6 text-emerald-400" />;
      default:
        return <Palette className="w-6 h-6 text-violet-400" />;
    }
  };

  const handleOpenModule = (code: string) => {
    soundFX.playClick();
    if (code === 'sandbox_canvas') {
      setActiveTab('sandbox');
    } else {
      setActiveTab('game');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-100">
            {t('Katalog Modul Pembelajaran Montessori', 'Montessori Learning Modules Catalog')}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {t(
              'Tersedia 4 modul inti berbasis manipulatif sensorik dan kelincahan berhitung mental.',
              'Available 4 core modules utilizing sensory manipulatives and mental calculation agility.'
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                  {getModuleIcon(mod.code)}
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Level {mod.level}
                </span>
              </div>

              <h4 className="text-base font-bold text-white">
                {t(mod.nameId, mod.nameEn)}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                {t(mod.descriptionId, mod.descriptionEn)}
              </p>
            </div>

            <button
              onClick={() => handleOpenModule(mod.code)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition active:scale-95"
            >
              <span>{t('Mulai Belajar', 'Start Learning')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
