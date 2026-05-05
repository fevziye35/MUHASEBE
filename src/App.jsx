import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import { LanguageProvider } from './context/LanguageContext';
import { BranchProvider } from './context/BranchContext';

// src/App.jsx
function App() {
  return (
    <LanguageProvider>
      <BranchProvider>
        <div className="flex min-h-screen bg-[#f8fafc]">
          <Sidebar /> 
          <main className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </BranchProvider>
    </LanguageProvider>
  );
}
export default App;