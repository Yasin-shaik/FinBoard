'use client';

import { ChevronRight, ChevronDown, Check, MousePointerClick } from 'lucide-react';
import { useState } from 'react';

interface JsonExplorerProps {
  data: any;
  path?: string;
  onSelect: (path: string) => void;
  selectedFields: string[];
}

export default function JsonExplorer({ data, path = '', onSelect, selectedFields }: JsonExplorerProps) {
  const [isExpanded, setIsExpanded] = useState(path === '');
  const isObject = data !== null && typeof data === 'object';
  const isArray = Array.isArray(data);
  const isEmpty = isObject && Object.keys(data).length === 0;
  const isSelected = selectedFields.includes(path);
  if (!isObject) {
    return (
      <div 
        onClick={() => onSelect(path)}
        className={`
          ml-4 flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700/50 text-sm font-mono transition-colors border border-transparent
          ${isSelected ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700' : 'text-slate-600 dark:text-slate-400'}
        `}
      >
        <span className="font-semibold text-purple-600 dark:text-purple-400 opacity-75">
          {path.split('.').pop()}:
        </span>
        <span className="truncate max-w-[200px]" title={String(data)}>
          {String(data)}
        </span>
        {isSelected && <Check size={14} className="ml-auto text-blue-500" />}
      </div>
    );
  }
  return (
    <div className="ml-4">
      <div className="flex items-center gap-2 py-1 group">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 cursor-pointer text-slate-700 dark:text-slate-300 text-sm hover:text-blue-500 transition-colors select-none"
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span className="font-bold font-mono">
            {path ? path.split('.').pop() : 'root'} 
            <span className="text-xs font-normal text-slate-400 ml-2">
              {isArray ? `[${data.length}]` : '{ }'}
            </span>
          </span>
        </div>
        {path !== '' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(path);
            }}
            className={`
              opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded
              ${isSelected 
                ? 'opacity-100 bg-blue-500 text-white shadow-sm' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-600'}
            `}
            title="Select this entire data structure"
          >
            {isSelected ? <Check size={10} /> : <MousePointerClick size={10} />}
            {isSelected ? 'Selected' : 'Select'}
          </button>
        )}
      </div>
      {isExpanded && !isEmpty && (
        <div className="border-l border-slate-200 dark:border-slate-700 pl-1 ml-1">
          {Object.keys(data).map((key) => {
            const newPath = path ? `${path}.${key}` : key;
            if (isArray && Number(key) > 4) return null;
            if (isArray && Number(key) === 5) {
              return (
                <div key="more" className="ml-6 text-xs text-slate-400 py-1">
                  ... {data.length - 5} more items
                </div>
              );
            }
            return (
              <JsonExplorer 
                key={newPath} 
                data={data[key]} 
                path={newPath} 
                onSelect={onSelect}
                selectedFields={selectedFields}
              />
            );
          })}
        </div>
      )}
      {isExpanded && isEmpty && (
        <div className="ml-6 text-xs text-slate-400 italic">Empty</div>
      )}
    </div>
  );
}