import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/utils/api';

interface UseFetchDataProps {
  url: string;
  refreshInterval?: number;
  enabled?: boolean;
}

export const useFetchData = ({ url, refreshInterval = 0, enabled = true }: UseFetchDataProps) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => fetcher(url),
    refetchInterval: refreshInterval > 0 ? refreshInterval * 1000 : false,
    enabled: !!url && enabled,
    staleTime: 5000, 
    refetchOnWindowFocus: false,
  });
};