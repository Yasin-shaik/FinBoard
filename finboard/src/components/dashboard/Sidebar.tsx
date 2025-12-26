'use client';

import { LayoutDashboard, Plus, Settings, Moon, Download, Upload } from 'lucide-react';
import { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setDashboard } from '@/store/dashboardSlice';
import { exportDashboard, validateImport } from '@/utils/backup';
import toast from 'react-hot-toast';

interface SidebarProps {
  onAddWidget: () => void;
}

export default function Sidebar({ onAddWidget }: SidebarProps) {
  const dispatch = useAppDispatch();
  const { widgets } = useAppSelector((state) => state.dashboard);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleExport = () => {
    if (widgets.length === 0) {
      toast.error("Nothing to export! Add widgets first.");
      return;
    }
    exportDashboard(widgets);
    toast.success("Dashboard configuration exported!");
  };
  const triggerImport = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const validWidgets = validateImport(content);
      if (validWidgets) {
        dispatch(setDashboard(validWidgets));
        toast.success(`Restored ${validWidgets.length} widgets!`);
      } else {
        toast.error("Invalid backup file.");
      }
    };
    reader.readAsText(file);
    e.target.value = ''; 
  };
  return (
    <aside className="w-64 bg-slate-900 text-slate-50 flex flex-col h-screen fixed left-0 top-0 z-10 shadow-xl">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          FinBoard
        </h1>
        <p className="text-xs text-slate-400 mt-1">Finance Dashboard Builder</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
          <LayoutDashboard size={20} className="text-blue-400" />
          <span className="font-medium dark:text-white">Dashboard</span>
        </div>
        <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors text-slate-400">
          <Settings size={20} />
          <span className='dark:text-white'>Settings</span>
        </div>
      </nav>
      <div className="p-4 border-t border-slate-800 space-y-2">
        <h4 className="px-4 text-xs font-semibold text-slate-500 dark:text-white uppercase tracking-wider mb-2">
          Backup & Restore
        </h4>
        <input 
          type="file" 
          ref={fileInputRef} 
          accept=".json" 
          className="hidden" 
          onChange={handleFileChange} 
        />
        <button 
          onClick={handleExport}
          className="w-full flex items-center px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
        >
          <Download size={18} className="mr-3" />
          <span className="text-sm dark:text-white font-medium">Export Config</span>
        </button>
        <button 
          onClick={triggerImport}
          className="w-full flex items-center px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
        >
          <Upload size={18} className="mr-3" />
          <span className="text-sm dark:text-white font-medium">Import Config</span>
        </button>
      </div>
      <div className="p-4 border-t border-slate-700 space-y-3">
        <button 
          onClick={onAddWidget}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
        >
          <Plus size={20} />
          <span className="font-bold dark:text-white">Add Widget</span>
        </button>
        <button className="w-full border border-slate-700 hover:bg-slate-800 text-slate-300 p-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
          <Moon size={16} />
          <span className="text-sm dark:text-white">Dark Mode</span>
        </button>
      </div>
    </aside>
  );
}