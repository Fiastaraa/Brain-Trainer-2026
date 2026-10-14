import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdventureProvider } from './context/AdventureContext';
import { MontessoriProvider } from './context/MontessoriContext';
import { AdventurePage } from './pages/AdventurePage';
import { MontessoriPage } from './pages/MontessoriPage';
import { LandingPage } from './pages/LandingPage';
import { GamePage } from './pages/GamePage';
import { DashboardPage } from './pages/DashboardPage';

export const App: React.FC = () => {
  return (
    <AdventureProvider>
      <MontessoriProvider>
        <Routes>
          {/* Main Codédex-style RPG Adventure Mode (Zero Login Required!) */}
          <Route path="/" element={<AdventurePage />} />
          <Route path="/adventure" element={<AdventurePage />} />

          {/* Montessori Teacher / Parent View & Concrete Canvas */}
          <Route path="/montessori" element={<MontessoriPage />} />

          {/* Classic Games & Dashboard */}
          <Route path="/classic" element={<LandingPage />} />
          <Route path="/games" element={<LandingPage />} />
          <Route path="/games/:slug" element={<GamePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MontessoriProvider>
    </AdventureProvider>
  );
};

export default App;
