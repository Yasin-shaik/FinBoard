'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getNestedValue } from '@/utils/getNestedValue';
import { Widget } from '@/types';

interface CardWidgetProps {
  data: any; // The raw JSON from the API
  config: Widget;
}

export default function CardWidget({ data, config }: CardWidgetProps) {
  // 1. Extract values based on user selection
  // We assume the FIRST selection is the Main Value, and SECOND is the Trend (if exists)
  const mainFieldPath = config.selectedFields[0];
  const trendFieldPath = config.selectedFields[1];

  const mainValue = getNestedValue(data, mainFieldPath);
  const trendValue = trendFieldPath ? getNestedValue(data, trendFieldPath) : null;

  // 2. Format the Main Value (Basic formatting)
  const formattedValue = typeof mainValue === 'number' 
    ? mainValue.toLocaleString('en-US', { maximumFractionDigits: 2 }) 
    : mainValue || '--';

  // 3. Determine Trend Visuals
  // If the trend value is a number, we can show red/green colors
  const isTrendPositive = typeof trendValue === 'number' && trendValue > 0;
  const isTrendNegative = typeof trendValue === 'number' && trendValue < 0;

  return (
    <div className="h-full flex flex-col justify-between p-2">
      
      {/* Top Section: Main Value */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
          {mainFieldPath?.split('.').pop() || 'Value'}
        </div>
        <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {typeof mainValue === 'number' ? '' : ''}
          {formattedValue}
        </div>
      </div>

      {/* Bottom Section: Trend Indicator (Only if 2nd field is selected) */}
      {trendValue !== null && trendValue !== undefined && (
        <div className="mt-4 flex items-center pt-4 border-t border-slate-100 dark:border-slate-700">
          <div 
            className={`
              flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full
              ${isTrendPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
              ${isTrendNegative ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
              ${!isTrendPositive && !isTrendNegative ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' : ''}
            `}
          >
            {isTrendPositive && <TrendingUp size={16} />}
            {isTrendNegative && <TrendingDown size={16} />}
            {!isTrendPositive && !isTrendNegative && <Minus size={16} />}
            
            <span>{typeof trendValue === 'number' ? Math.abs(trendValue).toFixed(2) : trendValue}%</span>
          </div>
          <span className="text-xs text-slate-400 ml-2">
            {trendFieldPath.split('.').pop()}
          </span>
        </div>
      )}
    </div>
  );
}