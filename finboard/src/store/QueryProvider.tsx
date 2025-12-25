'use client';

import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    // Global Query Cache Configuration
    queryCache: new QueryCache({
      onError: (error) => {
        // 1. Check for our specific Rate Limit error
        if (error.message === 'RATE_LIMIT_REACHED') {
          toast.error("API Rate Limit Reached! 🛑\nData fetching paused for a moment.", {
            duration: 5000,
            style: {
              border: '1px solid #EF4444',
              padding: '16px',
              color: '#EF4444',
              background: '#FEF2F2'
            },
          });
        } 
        // 2. Optional: Handle other common errors (like 401 Unauthorized)
        else {
          console.error(`Global Query Error: ${error.message}`);
        }
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        // Don't retry immediately if we hit a rate limit, it just makes it worse
        retry: (failureCount, error) => {
          if (error.message === 'RATE_LIMIT_REACHED') return false;
          return failureCount < 2;
        },
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}