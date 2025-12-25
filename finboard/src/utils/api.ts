export const fetcher = async (url: string) => {
  const res = await fetch(url);

  // 1. Specific handling for Rate Limits
  if (res.status === 429) {
    throw new Error('RATE_LIMIT_REACHED');
  }

  // 2. Generic error handling
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};