import React, { useState } from 'react';
import { Sparkles, Trash2, Plus, RotateCcw, Palette } from 'lucide-react';
import { useMontessori } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';

export const MontessoriSandbox: React.FC = () => {
  const { t, theme } = useMontessori();
  const isDark = theme === 'dark';

  const [rods, setRods] = useState<number[]>([3, 4, 7]);
  const [beadCount, setBeadCount] = useState<number>(10);

  const addRod = (length: number) => {
    soundFX.playClick();
    if (rods.length < 8) {
      setRods((prev) => [...prev, length]);
    }
  };

  const removeRod = (index: number) => {
    soundFX.playClick();
    setRods((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    soundFX.playClick();
    setRods([]);
    setBeadCount(0);
  };

  return (
    <div className="space-y-6">
      <div
        className={`p-6 sm:p-8 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800 shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                {t('Kanvas Eksplorasi Terbuka', 'Open Exploratory Canvas')}
              </span>
              <Palette className="w-4 h-4 text-violet-400" />
            </div>
            <h3 className="text-xl font-black mt-1">
              {t('Montessori Math Sandbox', 'Montessori Math Sandbox')}
            </h3>
            <p className="text-xs text-slate-400">
              {t(
                'Eksplorasi bebas tanpa batasan waktu untuk menyusun batang angka dan manik emas.',
                'Free exploratory space to construct number rods and golden beads without time limits.'
              )}
            </p>
          </div>

          <button
            onClick={clearAll}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('Bersihkan Kanvas', 'Clear Canvas')}</span>
          </button>
        </div>

        {/* Toolbar to add Rods */}
        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
          <p className="text-xs font-bold text-slate-300">
            {t('Tambah Batang Angka (Klik Panjang Segmen):', 'Add Number Rod (Click Length):')}
          </p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => addRod(num)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-700 hover:bg-indigo-600 text-white transition active:scale-95 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>{num}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Sandbox Surface */}
        <div className="my-6 min-h-64 p-6 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-4">
          {rods.length === 0 && beadCount === 0 && (
            <div className="h-48 flex items-center justify-center text-slate-500 text-xs text-center">
              {t(
                'Kanvas masih kosong. Klik tombol angka di atas untuk menambahkan batang!',
                'Canvas is empty. Click length buttons above to add rods!'
              )}
            </div>
          )}

          {rods.map((rod, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/30 border border-slate-700/40"
            >
              <span className="text-xs font-bold text-indigo-400 w-16">{rod} {t('Satuan', 'Units')}</span>
              <div className="flex-1 flex rounded overflow-hidden h-7 border border-slate-700/60 shadow">
                {Array.from({ length: rod }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 flex items-center justify-center text-[10px] font-bold text-white border-r border-black/20 ${
                      i % 2 === 0 ? 'bg-rose-500' : 'bg-blue-500'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <button
                onClick={() => removeRod(idx)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-700 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
