import React, { useState } from 'react';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';
import { Drawer, Hidden, SwipeableDrawer } from '@material-ui/core';
// import { useQuery } from '@apollo/react-hooks';

import { Header, Sidebar } from '@/client/components/composed';
import { useStyles } from './styles';

export default function App({ route }: RouteConfigComponentProps) {
  const classes = useStyles();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  // const { data } = useQuery(Theme);
  // const theme = useContext(ThemeContext);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  function renderSidebar() {
    return <Sidebar />;
  }

  return (
    <div className={classes.root}>
      <Header onDrawerButtonClick={toggleDrawer(!isDrawerOpen)} />
      <Hidden smUp implementation="css">
        <SwipeableDrawer
          onOpen={toggleDrawer(true)}
          onClose={toggleDrawer(false)}
          open={isDrawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {renderSidebar()}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {renderSidebar()}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        {route && route.routes && renderRoutes(route.routes)}
      </main>
    </div>
  );
}
