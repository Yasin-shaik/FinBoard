'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from './hooks';
import { setDashboard } from './dashboardSlice';

export default function DashboardPreloader() {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      const saved = localStorage.getItem('finboard_widgets');
      if (saved) {
        const parsedWidgets = JSON.parse(saved);
        if (Array.isArray(parsedWidgets)) {
          dispatch(setDashboard(parsedWidgets));
          console.log(`✅ Restored ${parsedWidgets.length} widgets from storage`);
        }
      }
    } catch (e) {
      console.error("Failed to load dashboard state:", e);
    }
  }, [dispatch]);

  return null;
}