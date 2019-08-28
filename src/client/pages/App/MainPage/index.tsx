import React from 'react';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';

import { Content } from './styles';
import { Sidebar } from '@/client/components/composed';

export default function App({ route }: RouteConfigComponentProps) {
  return (
    <>
      <Sidebar />
      <Content>{route && renderRoutes(route.routes)}</Content>
    </>
  );
}
