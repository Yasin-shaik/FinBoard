'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardCanvas from '@/components/dashboard/DashboardCanvas';
import ConfigModal from '@/components/dashboard/ConfigModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative">
      
      {/* Sidebar with Add Handler */}
      <Sidebar onAddWidget={() => setIsModalOpen(true)} />

      {/* Main Content Area */}
      <DashboardCanvas />

      {/* Widget Configuration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
           <div className="relative">
              {/* FIX: Passed the onClose prop correctly */}
              <ConfigModal onClose={() => setIsModalOpen(false)} /> 
              
              {/* Optional: Keeps the external close button if you want it outside the modal too */}
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