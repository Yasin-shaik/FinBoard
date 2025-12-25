'use client';

import { LayoutDashboard, Plus, Settings, Moon } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  onAddWidget: () => void;
}

export default function Sidebar({ onAddWidget }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 text-slate-50 flex flex-col h-screen fixed left-0 top-0 z-10 shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          FinBoard
        </h1>
        <p className="text-xs text-slate-400 mt-1">Finance Dashboard Builder</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
          <LayoutDashboard size={20} className="text-blue-400" />
          <span className="font-medium">Dashboard</span>
        </div>
        
        {/* Placeholder for future features */}
        <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors text-slate-400">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </nav>

      {/* Action Buttons */}
      <div className="p-4 border-t border-slate-700 space-y-3">
        <button 
          onClick={onAddWidget}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
        >
          <Plus size={20} />
          <span className="font-bold">Add Widget</span>
        </button>

        <button className="w-full border border-slate-700 hover:bg-slate-800 text-slate-300 p-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
          <Moon size={16} />
          <span className="text-sm">Dark Mode</span>
        </button>
      </div>
    </aside>
  );
}