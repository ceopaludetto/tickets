import React from 'react';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';
import { useMediaQuery } from '@material-ui/core';
import useTheme from '@material-ui/core/styles/useTheme';
import clsx from 'clsx';

import { useStyles } from './styles';

export default function Auth({ route }: RouteConfigComponentProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.container, {
        [classes.containerStart]: matches,
      })}
    >
      {route && renderRoutes(route.routes)}
    </div>
  );
}
