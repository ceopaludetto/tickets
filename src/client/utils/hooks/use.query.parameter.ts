import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import qs from 'query-string';

export function useQueryParameter() {
  const location = useLocation();
  const parsed = useMemo(() => qs.parse(location.pathname), [location]);

  return parsed;
}
