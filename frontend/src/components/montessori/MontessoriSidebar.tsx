import React from 'react';
import {
  LayoutDashboard,
  Boxes,
  Gamepad2,
  Palette,
  Award,
  Users,
  Settings,
  BrainCircuit,
} from 'lucide-react';
import { useMontessori, ActiveTab } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';

export const MontessoriSidebar: React.FC = () => {
  const { activeTab, setActiveTab, t, theme } = useMontessori();

  const navItems: { id: ActiveTab; labelId: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      labelId: 'Dashboard',
      labelEn: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'modules',
      labelId: 'Modul Belajar',
      labelEn: 'Modules',
      icon: <Boxes className="w-5 h-5" />,
    },
    {
      id: 'game',
      labelId: 'Game Interaktif',
      labelEn: 'Interactive Game',
      icon: <Gamepad2 className="w-5 h-5" />,
    },
    {
      id: 'sandbox',
      labelId: 'Sandbox Kanvas',
      labelEn: 'Sandbox',
      icon: <Palette className="w-5 h-5" />,
    },
    {
      id: 'rewards',
      labelId: 'Prestasi & Reward',
      labelEn: 'Achievement / Reward',
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: 'portal',
      labelId: 'Portal Guru & Ortu',
      labelEn: 'Parent / Teacher Portal',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'settings',
      labelId: 'Pengaturan',
      labelEn: 'Settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    soundFX.playClick();
    setActiveTab(tab);
  };

  const isDark = theme === 'dark';

  return (
    <aside
      className={`w-64 flex-shrink-0 flex flex-col border-r transition-colors ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-slate-300'
          : 'bg-white/95 border-slate-200 text-slate-700 shadow-sm'
      }`}
    >
      {/* Brand Logo & Subtitle */}
      <div className="p-5 border-b border-inherit">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
                Basic Math
              </span>
            </h1>
            <p className="text-[11px] font-medium opacity-70">Montessori Brain Trainer</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : isDark
                  ? 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                  : 'hover:bg-slate-100 hover:text-slate-900 text-slate-600'
              }`}
            >
              <span className={isActive ? 'text-white' : 'opacity-80'}>{item.icon}</span>
              <span>{t(item.labelId, item.labelEn)}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info / Montessori Badge */}
      <div className="p-4 border-t border-inherit">
        <div
          className={`p-3 rounded-xl text-xs ${
            isDark ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <p className="font-bold text-indigo-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            MySQL XAMPP Connected
          </p>
          <p className="mt-1 opacity-75">db: brain_trainer_db</p>
        </div>
      </div>
    </aside>
  );
};
