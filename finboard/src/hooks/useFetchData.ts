import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/utils/api';

interface UseFetchDataProps {
  url: string;
  refreshInterval?: number; // in seconds
  enabled?: boolean; // toggle to pause requests
}

export const useFetchData = ({ url, refreshInterval = 0, enabled = true }: UseFetchDataProps) => {
  // TanStack Query handles caching, deduplication, and background updates automatically
  return useQuery({
    queryKey: [url], // The cache key. If URL changes, data refetches.
    queryFn: () => fetcher(url),
    
    // Convert seconds to milliseconds for the library
    refetchInterval: refreshInterval > 0 ? refreshInterval * 1000 : false,
    
    // Only run query if we have a valid URL and 'enabled' is true
    enabled: !!url && enabled,

    // Keep data fresh for 5 seconds to prevent component re-renders from triggering duplicate calls
    staleTime: 5000, 
    
    // If the window loses focus, don't refetch aggressively
    refetchOnWindowFocus: false,
  });
};