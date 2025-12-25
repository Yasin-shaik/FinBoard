import { Middleware } from '@reduxjs/toolkit';

// We remove 'RootState' here to break the circular dependency loop.
// We use 'Middleware' without generics or with 'any' to keep it independent.
export const localStorageMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);

  // 1. Listen for dashboard actions
  if (action.type?.startsWith('dashboard/')) {
    // Cast state to 'any' so we don't need the circular RootState type
    const state = store.getState() as any;
    
    // 2. Save to LocalStorage
    try {
      const serializedState = JSON.stringify(state.dashboard.widgets);
      localStorage.setItem('finboard_widgets', serializedState);
    } catch (e) {
      console.warn("Failed to save state to localStorage:", e);
    }
  }

  return result;
};