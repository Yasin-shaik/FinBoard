'use client';

import { useState, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Widget } from '@/types';
import { processChartData } from '@/utils/processChartData';
import { Activity, BarChart2 } from 'lucide-react';

interface ChartWidgetProps {
  data: any;
  config: Widget;
}

export default function ChartWidget({ data, config }: ChartWidgetProps) {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  // 1. Determine X and Y fields from selection
  // Assumption: 1st selection = X Axis (Time), 2nd selection = Y Axis (Value)
  // If only 1 selected, we auto-generate X (index) and use selection as Y.
  const xField = config.selectedFields.length > 1 ? config.selectedFields[0] : '';
  const yField = config.selectedFields.length > 1 ? config.selectedFields[1] : config.selectedFields[0];

  // 2. Process Data
  const chartData = useMemo(() => {
    return processChartData(data, xField, yField);
  }, [data, xField, yField]);

  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 text-sm">
        Select fields to visualize data
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 bg-white dark:bg-slate-800 rounded-lg">
      
      {/* Header Controls */}
      <div className="flex justify-end mb-2 gap-2">
        <button
          onClick={() => setChartType('line')}
          className={`p-1.5 rounded transition-colors ${chartType === 'line' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          title="Line Chart"
        >
          <Activity size={16} />
        </button>
        <button
          onClick={() => setChartType('bar')}
          className={`p-1.5 rounded transition-colors ${chartType === 'bar' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          title="Bar Chart"
        >
          <BarChart2 size={16} />
        </button>
      </div>

      {/* Chart Area */}
      <div className="flex-1 w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="name" 
                hide={chartData.length > 20} // Hide X labels if too crowded
                tick={{ fontSize: 10, fill: '#94A3B8' }} 
              />
              <YAxis 
                width={60} // Increased width so "$88,000" fits
                tick={{ fontSize: 10, fill: '#94A3B8' }}
                
                // CHANGE THIS LINE:
                // Old: domain={['auto', 'auto']}
                // New: 'dataMin' makes the chart zoom in on the lowest value visible
                domain={['dataMin', 'auto']} 
                
                // Optional: Add a formatter to show "k" or "$"
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2563EB" 
                strokeWidth={2} 
                dot={false} 
                activeDot={{ r: 4 }}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="name" 
                hide={chartData.length > 20}
                tick={{ fontSize: 10, fill: '#94A3B8' }} 
              />
              <YAxis 
                width={40} 
                tick={{ fontSize: 10, fill: '#94A3B8' }} 
              />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}