import { Widget } from '@/types';
export const exportDashboard = (widgets: Widget[]) => {
  if (!widgets || widgets.length === 0) return;
  const dataStr = JSON.stringify(widgets, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `finboard-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const validateImport = (fileContent: string): Widget[] | null => {
  try {
    const parsed = JSON.parse(fileContent);
    if (!Array.isArray(parsed)) throw new Error('Root is not an array');
    if (parsed.length > 0 && (!parsed[0].id || !parsed[0].type)) {
      throw new Error('Invalid widget structure');
    }
    return parsed;
  } catch (e) {
    console.error("Import Validation Failed:", e);
    return null;
  }
};