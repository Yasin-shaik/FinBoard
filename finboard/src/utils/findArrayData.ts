export const findArrayData = (data: any): any[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'object') {
    const commonKeys = ['data', 'results', 'items', 'coins', 'stocks'];
    for (const key of commonKeys) {
      if (Array.isArray(data[key])) return data[key];
    }
    for (const key in data) {
      if (Array.isArray(data[key])) return data[key];
    }
  }
  return [];
};