import { RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import { DocumentNode } from 'graphql';

import { ApolloClient } from 'apollo-client';

export type Route = Omit<RouteConfig, 'path'> & {
  path: string | string[];
  name?: string;
  icon?: React.ReactNode;
  routes?: Route[];
  query?: DocumentNode;
};

export type RenderProps = {
  client: ApolloClient<object>;
} & RouteConfigComponentProps;
