import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

export default function Auth({ route }: RouteConfigComponentProps) {
  return <div>{route && renderRoutes(route.routes)}</div>;
}
