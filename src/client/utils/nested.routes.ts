import { routes, Route } from '@/client/providers/route';

export const nested = (deep: (string | number)[]) => {
  let res: any[] = routes;
  if (Array.isArray(deep)) {
    deep.forEach(d => {
      res = res[d as any];
    });
  }
  return res as Route[];
};
