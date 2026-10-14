import React from 'react';
import { useMontessori } from '../context/MontessoriContext';
import { MontessoriSidebar } from '../components/montessori/MontessoriSidebar';
import { MontessoriHeader } from '../components/montessori/MontessoriHeader';
import { MontessoriDashboard } from '../components/montessori/MontessoriDashboard';
import { NumberRodsGame } from '../components/montessori/NumberRodsGame';
import { GoldenBeadsGame } from '../components/montessori/GoldenBeadsGame';
import { ParentTeacherPortal } from '../components/montessori/ParentTeacherPortal';
import { ModulesCatalog } from '../components/montessori/ModulesCatalog';
import { MontessoriSandbox } from '../components/montessori/MontessoriSandbox';
import { RewardsView } from '../components/montessori/RewardsView';
import { SettingsView } from '../components/montessori/SettingsView';

export const MontessoriPage: React.FC = () => {
  const { activeTab, theme } = useMontessori();
  const isDark = theme === 'dark';

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <MontessoriDashboard />;
      case 'modules':
        return <ModulesCatalog />;
      case 'game':
        return <NumberRodsGame />;
      case 'sandbox':
        return <MontessoriSandbox />;
      case 'rewards':
        return <RewardsView />;
      case 'portal':
        return <ParentTeacherPortal />;
      case 'settings':
        return <SettingsView />;
      default:
        return <MontessoriDashboard />;
    }
  };

  return (
    <div
      className={`min-h-screen flex transition-colors ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      {/* Sidebar Layout */}
      <MontessoriSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <MontessoriHeader />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderActiveContent()}
        </main>
      </div>
    </div>
  );
};
