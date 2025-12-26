export type WidgetType = 'card' | 'table' | 'chart';

export interface Widget {
  id: string;
  name: string;
  description?: string;
  type: WidgetType;
  apiEndpoint: string;
  refreshInterval: number;
  position: { x: number; y: number; w: number; h: number };
  selectedFields: string[]; 
}