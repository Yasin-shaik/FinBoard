import { Middleware } from '@reduxjs/toolkit';
export const localStorageMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);
  if (action.type?.startsWith('dashboard/')) {
    const state = store.getState() as any;
    try {
      const serializedState = JSON.stringify(state.dashboard.widgets);
      localStorage.setItem('finboard_widgets', serializedState);
    } catch (e) {
      console.warn("Failed to save state to localStorage:", e);
    }
  }
  return result;
};