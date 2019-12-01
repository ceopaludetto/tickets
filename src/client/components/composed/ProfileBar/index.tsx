import React from 'react';
import { IconButton, Divider } from '@material-ui/core';
import { SearchOutlined, UnfoldMoreOutlined, AddOutlined } from '@material-ui/icons';

import { useStyles } from './styles';

export function ProfileBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.firstOptions}>
        <IconButton className={classes.icon}>
          <SearchOutlined />
        </IconButton>
        <IconButton className={classes.icon}>
          <AddOutlined />
        </IconButton>
        <Divider className={classes.divider} />
      </div>
      <div className={classes.lastOptions}>
        <IconButton className={classes.icon}>
          <UnfoldMoreOutlined />
        </IconButton>
      </div>
    </div>
  );
}
