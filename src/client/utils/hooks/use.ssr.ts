export function useSSR() {
  const isBrowser = typeof window !== 'undefined';

  return { isBrowser };
}
