'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from './hooks';
import { setDashboard } from './dashboardSlice';

export default function DashboardPreloader() {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double-loading in React Strict Mode
    if (initialized.current) return;
    initialized.current = true;

    try {
      // 1. Read from LocalStorage
      const saved = localStorage.getItem('finboard_widgets');
      
      if (saved) {
        const parsedWidgets = JSON.parse(saved);
        
        // 2. Validate it's an array (Basic safety check)
        if (Array.isArray(parsedWidgets)) {
          // 3. Dispatch to Redux
          dispatch(setDashboard(parsedWidgets));
          console.log(`✅ Restored ${parsedWidgets.length} widgets from storage`);
        }
      }
    } catch (e) {
      console.error("Failed to load dashboard state:", e);
    }
  }, [dispatch]);

  return null; // This component renders nothing visually
}