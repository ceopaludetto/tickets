import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  SearchOutlined,
  UnfoldMoreOutlined,
  AddOutlined,
} from '@material-ui/icons';

import { useStyles } from './styles';

export function ProfileBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.firstOptions}>
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <IconButton>
          <AddOutlined />
        </IconButton>
      </div>
      <div className={classes.lastOptions}>
        <IconButton>
          <UnfoldMoreOutlined />
        </IconButton>
      </div>
    </div>
  );
}
