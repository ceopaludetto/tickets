import React, { useState, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Breadcrumbs,
  Link,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';
import {
  MenuOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
  NavigateNextOutlined,
} from '@material-ui/icons';
import { useLocation } from 'react-router';

import { PrefetchLink } from '../PrefetchLink';
import { AppRoutes } from '@/client/providers/route';
import { useStyles } from './styles';

interface HeaderProps {
  onDrawerButtonClick?: (e: React.MouseEvent) => void;
}

export function Header({ onDrawerButtonClick }: HeaderProps) {
  const classes = useStyles();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const pathnames = useMemo(() => location.pathname.split('/').filter(v => v), [
    location.pathname,
  ]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={trigger ? 1 : 0}
      className={classes.appBar}
    >
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
        <Breadcrumbs separator={<NavigateNextOutlined fontSize="small" />}>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            let routes = AppRoutes.find(v =>
              typeof v.path === 'string'
                ? v.path === to
                : !!v.path.find(nv => nv === to)
            );

            if (routes && routes.routes) {
              const nested = routes && routes.routes.find(v => v.path === to);

              if (nested && nested.path === to && index >= 2) {
                routes = nested;
              }
            }

            return last ? (
              <Typography color="textPrimary" key={to}>
                {routes && routes.name}
              </Typography>
            ) : (
              <Link component={PrefetchLink} color="inherit" to={to} key={to}>
                {routes && routes.name}
              </Link>
            );
          })}
        </Breadcrumbs>
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
