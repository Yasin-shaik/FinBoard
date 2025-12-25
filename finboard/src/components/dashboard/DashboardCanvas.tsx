'use client';

import { LayoutGrid } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import WidgetGrid from './WidgetGrid';

export default function DashboardCanvas() {
  const { widgets } = useAppSelector((state) => state.dashboard);

  return (
    <main className="ml-64 p-8 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            My Overview
          </h2>
          <p className="text-slate-500 dark:text-white">
            Real-time financial monitoring
          </p>
        </div>
      </header>

      {/* Empty State / Grid */}
      {widgets.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-100/50 dark:bg-slate-900/40">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-sm mb-4">
            <LayoutGrid size={48} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 dark:text-white">
            No widgets yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-center mt-2">
            Your dashboard is empty. Click “Add Widget” in the sidebar to start
            tracking your financial data.
          </p>
        </div>
      ) : (
        <WidgetGrid />
      )}
    </main>
  );
}
