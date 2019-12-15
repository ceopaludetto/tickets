import { get } from 'lodash';

import { routes, Route } from '@/client/providers/route';

export const nested = (deep: string | string[]) => get(routes, deep) as Route[];
