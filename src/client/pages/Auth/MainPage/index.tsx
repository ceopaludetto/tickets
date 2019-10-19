import React from 'react';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';

import { useStyles } from './styles';

export default function Auth({ route }: RouteConfigComponentProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {route && renderRoutes(route.routes)}
    </div>
  );
}
