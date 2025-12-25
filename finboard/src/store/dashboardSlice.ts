// src/store/dashboardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Widget } from '@/types';

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DashboardState {
  widgets: Widget[];
  isEditMode: boolean; // Toggles drag-and-drop functionality
}

const initialState: DashboardState = {
  widgets: [],
  isEditMode: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Action to add a configured widget to the dashboard [cite: 18]
    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets.push(action.payload);
    },
    
    // Action to delete a widget by ID [cite: 31]
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter((w) => w.id !== action.payload);
    },
    
    // Action to update position after drag-and-drop [cite: 32]
    updateWidgetPosition: (state, action: PayloadAction<{ id: string; position: any }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.id);
      if (widget) {
        widget.position = action.payload.position;
      }
    },

    // Action to update specific settings (e.g., changing refresh interval) [cite: 33]
    updateWidgetConfig: (state, action: PayloadAction<{ id: string; updates: Partial<Widget> }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.id);
      if (widget) {
        Object.assign(widget, action.payload.updates);
      }
    },

    // Action to rehydrate state from local storage [cite: 96]
    setWidgets: (state, action: PayloadAction<Widget[]>) => {
      state.widgets = action.payload;
    },

    updateLayout: (state, action: PayloadAction<LayoutItem[]>) => {
      action.payload.forEach((item) => {
        const widget = state.widgets.find((w) => w.id === item.i);
        if (widget) {
          widget.position = {
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
          };
        }
      });
    },
  },
});

export const { 
  addWidget, 
  removeWidget, 
  updateWidgetPosition, 
  updateWidgetConfig,
  updateLayout, 
  setWidgets 
} = dashboardSlice.actions;

export default dashboardSlice.reducer;