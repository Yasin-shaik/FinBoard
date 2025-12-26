'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardCanvas from '@/components/dashboard/DashboardCanvas';
import ConfigModal from '@/components/dashboard/ConfigModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative">
      <Sidebar onAddWidget={() => setIsModalOpen(true)} />
      <DashboardCanvas />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
           <div className="relative">
              <ConfigModal onClose={() => setIsModalOpen(false)} /> 
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white"
              >
                Close
              </button>
           </div>
        </div>
      )}
    </div>
  );
}