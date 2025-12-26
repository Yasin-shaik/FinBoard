'use client';

import { ReactNode } from 'react';
import { Trash2, Edit2, MoreVertical, RefreshCw, AlertCircle } from 'lucide-react';

interface WidgetWrapperProps {
  id: string;
  title: string;
  isLoading?: boolean;
  error?: string | null;
  onRemove: () => void;
  onEdit: () => void;
  onRefresh?: () => void;
  children: ReactNode;
  className?: string;
}

export default function WidgetWrapper({
  title,
  isLoading = false,
  error = null,
  onRemove,
  onEdit,
  onRefresh,
  children,
  className
}: WidgetWrapperProps) {
  return (
    <div className={`flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-md ${className}`}>
      <div className="drag-handle cursor-move flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 truncate pr-4" title={title}>
          {title}
        </h3>
        <div className="flex items-center gap-1">
          {onRefresh && (
            <button 
              onClick={onRefresh}
              className="p-1.5 text-slate-400 hover:text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            </button>
          )}
          <button 
            onClick={onEdit}
            className="p-1.5 text-slate-400 hover:text-amber-500 rounded-md hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            title="Edit Widget"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={onRemove}
            className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Remove Widget"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 relative min-h-[150px]">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-full mb-2">
              <AlertCircle size={24} className="text-red-500" />
            </div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Failed to load data</p>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px] truncate" title={error}>
              {error}
            </p>
          </div>
        ) 
        : isLoading && !children ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-800/80 z-10">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw size={24} className="animate-spin text-blue-500" />
              <span className="text-xs text-slate-400 font-medium">Updating...</span>
            </div>
          </div>
        ) 
        : (
          <div className="h-full w-full">
            {children}
            {isLoading && (
              <div className="absolute top-2 right-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}