import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import { DocumentNode } from 'graphql';

import { LoggedQuery } from '@/client/typescript/graphql';

export type Route = Omit<RouteConfig, 'path'> & {
  path: string | string[];
  name?: string;
  icon?: React.ReactNode;
  routes?: Route[];
  query?: DocumentNode;
};

export type RenderProps = { data?: LoggedQuery } & RouteConfigComponentProps;
