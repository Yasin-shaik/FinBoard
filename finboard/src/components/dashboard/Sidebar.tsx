'use client';

import { LayoutDashboard, Plus, Settings, Moon, Sun, Download, Upload, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setDashboard } from '@/store/dashboardSlice';
import { exportDashboard, validateImport } from '@/utils/backup';
import toast from 'react-hot-toast';
import { useTheme } from "next-themes";

interface SidebarProps {
  onAddWidget: () => void;
}

export default function Sidebar({ onAddWidget }: SidebarProps) {
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { widgets } = useAppSelector((state) => state.dashboard);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <>
    <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md shadow-lg border border-slate-200 dark:border-slate-700"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    <aside className={`
        fixed top-0 left-0 h-screen w-64 
        bg-white dark:bg-slate-900 
        text-slate-900 dark:text-white 
        border-r border-slate-200 dark:border-slate-800 
        z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent">
          FinBoard
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Finance Dashboard Builder</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-slate-800 rounded-lg cursor-pointer transition-colors">
          <LayoutDashboard size={20} className="text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-blue-700 dark:text-white">Dashboard</span>
        </div>
        <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <h4 className="px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
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
          className="w-full flex items-center px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
        >
          <Download size={18} className="mr-3" />
          <span className="text-sm font-medium">Export Config</span>
        </button>
        <button 
          onClick={triggerImport}
          className="w-full flex items-center px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
        >
          <Upload size={18} className="mr-3" />
          <span className="text-sm font-medium">Import Config</span>
        </button>
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <button 
          onClick={onAddWidget}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 active:scale-95"
        >
          <Plus size={20} />
          <span className="font-bold">Add Widget</span>
        </button>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full flex items-center justify-center px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors mt-2"
        >
          {!mounted ? (
            <div className="w-5 h-5 mr-3" /> 
          ) : theme === 'dark' ? (
            <Sun size={18} className="mr-3 text-yellow-500" />
          ) : (
            <Moon size={18} className="mr-3 text-blue-500" />
          )}
          <span className="text-sm font-medium">
            {mounted && theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </aside>
    {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
  </>
  );
}