'use client';

import { useState } from 'react';
import { LayoutGrid, Plus } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import WidgetGrid from './WidgetGrid';
import ConfigModal from './ConfigModal';
import { Widget } from '@/types';

export default function DashboardCanvas() {
  const { widgets } = useAppSelector((state) => state.dashboard);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const handleAddWidget = () => {
    setEditingWidget(null);
    setIsModalOpen(true);
  };
  const handleEditWidget = (widget: Widget) => {
    setEditingWidget(widget);
    setIsModalOpen(true);
  };
  return (
    <main className="md:ml-64 p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pt-20 md:pt-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            My Overview
          </h2>
          <p className="text-slate-500 dark:text-white">
            Real-time financial monitoring
          </p>
        </div>
        <button 
          onClick={handleAddWidget}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus size={20} /> Add Widget
        </button>
      </header>
      {widgets.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-100/50 dark:bg-slate-900/40">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-sm mb-4">
            <LayoutGrid size={48} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 dark:text-white">
            No widgets yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-center mt-2 mb-6">
            Your dashboard is empty. Click below to start tracking data.
          </p>
          <button 
            onClick={handleAddWidget}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add First Widget
          </button>
        </div>
      ) : (
        <WidgetGrid onEditWidget={handleEditWidget} />
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <ConfigModal 
            onClose={() => setIsModalOpen(false)} 
            widgetToEdit={editingWidget} 
          />
        </div>
      )}
    </main>
  );
}