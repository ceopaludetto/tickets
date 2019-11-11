import React, { useMemo, forwardRef } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { Route } from '@/client/providers/route';
import { PrefetchNavLink } from '@/client/components/composed';
import { useStyles } from './styles';

interface IconProps {
  color: 'primary' | 'secondary';
}

export function ListItemLink(r: Route) {
  const Icon = useMemo(
    () => r.icon as ({ color }: IconProps) => JSX.Element,
    []
  );
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <PrefetchNavLink
          {...itemProps}
          innerRef={ref as React.RefObject<HTMLAnchorElement>}
          to={typeof r.path === 'string' ? r.path : r.path[0]}
          exact={r.exact}
        />
      )),
    []
  );
  const classes = useStyles();

  return (
    <ListItem
      button
      className={classes.listItem}
      activeClassName={classes.listItemActive}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component={renderLink as any}
    >
      <ListItemIcon>
        <Icon color="primary" />
      </ListItemIcon>
      <ListItemText
        primary={r.name}
        classes={{ primary: classes.listItemText }}
      />
    </ListItem>
  );
}
