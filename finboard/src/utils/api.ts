export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.status === 429) {
    throw new Error('RATE_LIMIT_REACHED');
  }
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
};