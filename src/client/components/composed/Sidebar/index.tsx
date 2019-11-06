import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import { ProfileBar } from '../ProfileBar';
import { PrefetchNavLink } from '../PrefetchNavLink';
import { useStyles } from './styles';
import { AppRoutes } from '@/client/providers/route';

interface IconProps {
  color: 'primary' | 'secondary';
}

export function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProfileBar />
      <List className={classes.list}>
        {AppRoutes.filter(r => !!r.icon).map(r => {
          const Icon = r.icon as ({ color }: IconProps) => JSX.Element;
          return (
            <ListItem
              className={classes.listItem}
              button
              component={props => (
                <PrefetchNavLink {...props} to={r.path} exact={r.exact} />
              )}
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
        })}
      </List>
    </div>
  );
}
