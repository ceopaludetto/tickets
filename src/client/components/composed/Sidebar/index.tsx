import React from 'react';
import { List } from '@material-ui/core';

import { ProfileBar } from '../ProfileBar';
import { useStyles } from './styles';
import { AppRoutes } from '@/client/providers/route';
import { ListItemLink } from '../ListItemLink';

export function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProfileBar />
      <List className={classes.list} component="nav">
        {AppRoutes.filter(r => !!r.icon).map(r => (
          <ListItemLink
            {...r}
            key={typeof r.path === 'string' ? r.path : r.path[0]}
          />
        ))}
      </List>
    </div>
  );
}
