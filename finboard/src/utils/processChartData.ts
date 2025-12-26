import { getNestedValue } from './getNestedValue';
import { findArrayData } from './findArrayData';

export const processChartData = (data: any, xField: string, yField: string) => {
  const rawArray = findArrayData(data);
  if (!rawArray || rawArray.length === 0) return [];
  return rawArray.map((item, index) => {
    let xVal: any;
    let yVal: any;
    if (Array.isArray(item) && item.length >= 2 && (!xField || !yField || xField === yField)) {
       xVal = item[0]; 
       yVal = item[1]; 
    } 
    else {
      xVal = xField ? getNestedValue(item, xField) : index;
      yVal = yField ? getNestedValue(item, yField) : 0;
    }
    if (typeof xVal === 'number' && xVal > 1000000000000) {
      xVal = new Date(xVal).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
    return {
      name: xVal,
      value: Number(yVal) || 0,
    };
  });
};