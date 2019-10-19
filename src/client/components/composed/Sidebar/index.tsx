import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { HomeOutlined } from '@material-ui/icons';

import { useStyles } from './styles';

export function Sidebar() {
  const classes = useStyles();

  return (
    <>
      <List className={classes.list}>
        <ListItem className={classes.listItem} button>
          <ListItemIcon>
            <HomeOutlined color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Início"
            classes={{ primary: classes.listItemText }}
          />
        </ListItem>
        <ListItem className={classes.listItem} button>
          <ListItemIcon>
            <HomeOutlined color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Mesa"
            classes={{ primary: classes.listItemText }}
          />
        </ListItem>
      </List>
    </>
  );
}
