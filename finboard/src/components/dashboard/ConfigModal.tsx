'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addWidget } from '@/store/dashboardSlice';
import { WidgetType } from '@/types';
import { X, Save, BarChart3, Table as TableIcon, CreditCard, Loader2, AlertCircle } from 'lucide-react';
import JsonExplorer from './JsonExplorer';

interface ConfigModalProps {
  onClose: () => void;
}

export default function ConfigModal({ onClose }: ConfigModalProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [refreshInterval, setRefreshInterval] = useState(60);
  const [type, setType] = useState<WidgetType>('card');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleTestApi = async () => {
    if (!apiEndpoint) return;
    setIsLoading(true);
    setError(null);
    setPreviewData(null);
    try {
      const res = await fetch(apiEndpoint);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();
      setPreviewData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setIsLoading(false);
    }
  };
  const handleFieldSelect = (path: string) => {
    setSelectedFields(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !apiEndpoint) return;
    dispatch(addWidget({
      id: crypto.randomUUID(),
      name,
      description,
      type,
      apiEndpoint,
      refreshInterval,
      position: { x: 0, y: 0, w: 1, h: 2 },
      selectedFields: selectedFields
    }));
    onClose();
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-[90vh] flex flex-col">
      <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex-shrink-0">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Configure Widget</h2>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Widget Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g., Bitcoin Price"
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g., Live BTC/USD"
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">API Endpoint URL</label>
          <div className="flex gap-2">
            <input 
              type="url" 
              required
              placeholder="https://api.coingecko.com/api/v3/..."
              className="flex-1 p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
            />
            <button 
              type="button" 
              onClick={handleTestApi}
              disabled={isLoading || !apiEndpoint}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 font-medium text-sm transition-colors min-w-[80px] flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Test'}
            </button>
          </div>
          <p className="text-xs text-slate-500">Enter a public JSON API endpoint.</p>
        </div>
        {(previewData || error) && (
          <div className="border rounded-lg overflow-hidden border-slate-200 dark:border-slate-700 transition-all">
            <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <span className="text-xs font-bold uppercase text-slate-500">
                {error ? 'Error' : 'Response Explorer'}
              </span>
              <span className="text-xs text-slate-400">
                {selectedFields.length} fields selected
              </span>
            </div>
            
            <div className="max-h-[250px] overflow-y-auto p-4 bg-white dark:bg-slate-800 text-sm">
              {error ? (
                <div className="flex items-center text-red-500 gap-2">
                  <AlertCircle size={16} /> {error}
                </div>
              ) : (
                <div className="space-y-1">
                   <p className="text-xs text-slate-400 mb-2">
                     Click on fields below to display them in your widget:
                   </p>
                   <JsonExplorer 
                     data={previewData} 
                     onSelect={handleFieldSelect} 
                     selectedFields={selectedFields} 
                   />
                </div>
              )}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Refresh Interval (sec)</label>
            <input 
              type="number" 
              min="5"
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Display Mode</label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                type="button"
                onClick={() => setType('card')}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                  type === 'card' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-500'
                }`}
              >
                <CreditCard size={20} className="mb-1" />
                <span className="text-xs font-medium">Card</span>
              </button>
              <button 
                type="button"
                onClick={() => setType('table')}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                  type === 'table' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-500'
                }`}
              >
                <TableIcon size={20} className="mb-1" />
                <span className="text-xs font-medium">Table</span>
              </button>
              <button 
                type="button"
                onClick={() => setType('chart')}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                  type === 'chart' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-500'
                }`}
              >
                <BarChart3 size={20} className="mb-1" />
                <span className="text-xs font-medium">Chart</span>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-4 flex justify-end space-x-3 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-900/20 transition-all flex items-center"
          >
            <Save size={18} className="mr-2" />
            Save Widget
          </button>
        </div>

      </form>
    </div>
  );
}