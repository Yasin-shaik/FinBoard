import { getNestedValue } from './getNestedValue';
import { findArrayData } from './findArrayData';

export const processChartData = (data: any, xField: string, yField: string) => {
  const rawArray = findArrayData(data);
  if (!rawArray || rawArray.length === 0) return [];

  return rawArray.map((item, index) => {
    let xVal: any;
    let yVal: any;

    // --- SMART DETECTION START ---
    // If the row is an array like [1766070118631, 88384.71] (Timestamp, Price)
    // and the user hasn't explicitly mapped specific fields, auto-detect it.
    if (Array.isArray(item) && item.length >= 2 && (!xField || !yField || xField === yField)) {
       xVal = item[0]; // First item is usually Time
       yVal = item[1]; // Second item is usually Value
    } 
    // --- SMART DETECTION END ---
    else {
      // Standard Logic (Named objects)
      xVal = xField ? getNestedValue(item, xField) : index;
      yVal = yField ? getNestedValue(item, yField) : 0;
    }

    // Format Timestamp to Date
    // Checks if number is a millisecond timestamp (usually > 1000000000000)
    if (typeof xVal === 'number' && xVal > 1000000000000) {
      xVal = new Date(xVal).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    return {
      name: xVal,
      value: Number(yVal) || 0,
    };
  });
};