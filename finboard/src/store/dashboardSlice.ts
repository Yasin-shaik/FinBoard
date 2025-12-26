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
  isEditMode: boolean;
}

const initialState: DashboardState = {
  widgets: [],
  isEditMode: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets.push(action.payload);
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter((w) => w.id !== action.payload);
    },
    updateWidgetPosition: (state, action: PayloadAction<{ id: string; position: any }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.id);
      if (widget) {
        widget.position = action.payload.position;
      }
    },
    updateWidgetConfig: (state, action: PayloadAction<{ id: string; updates: Partial<Widget> }>) => {
      const widget = state.widgets.find((w) => w.id === action.payload.id);
      if (widget) {
        Object.assign(widget, action.payload.updates);
      }
    },
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
    setDashboard: (state, action: PayloadAction<Widget[]>) => {
      state.widgets = action.payload;
    },
  },
});

export const { 
  addWidget, 
  removeWidget, 
  updateWidgetPosition, 
  updateWidgetConfig,
  updateLayout, 
  setWidgets,
  setDashboard 
} = dashboardSlice.actions;

export default dashboardSlice.reducer;