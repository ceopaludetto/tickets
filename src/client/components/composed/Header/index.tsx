import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import {
  MenuOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
} from '@material-ui/icons';

import { PrefetchLink } from '../PrefetchLink';
import { useStyles } from './styles';

interface HeaderProps {
  onDrawerButtonClick?: (e: React.MouseEvent) => void;
}

export function Header({ onDrawerButtonClick }: HeaderProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" elevation={0} className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerButtonClick}
          className={classes.menuButton}
        >
          <MenuOutlined />
        </IconButton>
        <div className={classes.spacer} />
        <IconButton
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleClose}
            component={PrefetchLink}
            to="/app/settings"
          >
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            Configurações
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ExitToAppOutlined />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
