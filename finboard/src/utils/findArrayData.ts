// Recursively searches a JSON object to find the first/largest array to use as table rows
export const findArrayData = (data: any): any[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;

  // If it's an object, look for a property that is an array
  if (typeof data === 'object') {
    // 1. Prioritize common keys for lists
    const commonKeys = ['data', 'results', 'items', 'coins', 'stocks'];
    for (const key of commonKeys) {
      if (Array.isArray(data[key])) return data[key];
    }

    // 2. Otherwise, return the first array found with length > 0
    for (const key in data) {
      if (Array.isArray(data[key])) return data[key];
    }
  }

  return []; // Fallback if no array found
};