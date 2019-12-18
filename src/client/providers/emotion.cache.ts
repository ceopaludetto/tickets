import createCache from '@emotion/cache';

export const generateCache = () =>
  createCache({
    key: '-',
  });
