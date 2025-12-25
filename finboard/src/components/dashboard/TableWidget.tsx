'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Widget } from '@/types';
import { findArrayData } from '@/utils/findArrayData';

interface TableWidgetProps {
  data: any;
  config: Widget;
}

export default function TableWidget({ data, config }: TableWidgetProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // 1. Locate the array data automatically
  const rawRows = useMemo(() => findArrayData(data), [data]);

  // 2. Identify Columns
  // If user selected fields in the Explorer, try to use those as column headers.
  // Otherwise, grab the keys from the first item in the array.
  const columns = useMemo(() => {
    if (rawRows.length === 0) return [];
    
    // Simplification: Use keys of the first object
    // In a real app, you might map the 'selectedFields' paths to these keys
    return Object.keys(rawRows[0]).slice(0, 5); // Limit to 5 columns for UI sanity
  }, [rawRows]);

  // 3. Filter Data (Search)
  const filteredRows = useMemo(() => {
    if (!searchTerm) return rawRows;
    const lowerTerm = searchTerm.toLowerCase();
    
    return rawRows.filter(row => 
      Object.values(row).some(val => 
        String(val).toLowerCase().includes(lowerTerm)
      )
    );
  }, [rawRows, searchTerm]);

  // 4. Pagination Logic
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (rawRows.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 text-sm">
        No array data found in response.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-2 bg-white dark:bg-slate-800 rounded-lg">
      
      {/* Header: Search Bar */}
      <div className="flex items-center gap-2 mb-3 bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
        <Search size={16} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search data..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-slate-200"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
        />
      </div>

      {/* Table Area - Scrollable */}
      <div className="flex-1 overflow-auto border border-slate-200 dark:border-slate-700 rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-3 py-2 font-medium capitalize truncate max-w-[100px]">
                  {col.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {paginatedRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                {columns.map((col) => (
                  <td key={`${idx}-${col}`} className="px-3 py-2 text-slate-700 dark:text-slate-300 truncate max-w-[150px]">
                     {/* Basic rendering of objects/arrays if they exist in cells */}
                     {typeof row[col] === 'object' ? '...' : String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
            {paginatedRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-slate-400">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: Pagination */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
        <span className="text-xs text-slate-500">
          Page {currentPage} of {totalPages || 1}
        </span>
        <div className="flex gap-1">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}