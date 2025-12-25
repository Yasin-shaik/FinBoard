// Helper to read "data.rates.bitcoin" from { data: { rates: { bitcoin: 50000 } } }
export const getNestedValue = (obj: any, path: string) => {
  if (!obj || !path) return undefined;
  
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : undefined;
  }, obj);
};