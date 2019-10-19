import React, { useState } from 'react';
// import { ThemeProvider, ThemeContext } from 'styled-components';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';
import { Drawer, Hidden, SwipeableDrawer } from '@material-ui/core';
// import { useQuery } from '@apollo/react-hooks';
// import { FiSettings, FiSearch } from 'react-icons/fi';

// import { GlobalBackground, Main } from './styles';
// import { Sidebar, SidebarItem } from '@/client/components/composed';
// import { IconButton } from '@/client/components/form';
// import { PrefetchLink } from '@/client/components/typo';
// import { Avatar } from '@/client/components/layout';
// import { Theme } from '@/client/graphql/local.gql';
// import { Mode } from '@/client/providers/theme';
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

  // return (
  //   <ThemeProvider
  //     theme={{ ...theme, mode: data.isDark ? Mode.Dark : Mode.Light }}
  //   >
  //     <>
  //       <GlobalBackground />
  //       <Sidebar
  //         profileContent={
  //           <>
  //             <IconButton>
  //               <FiSearch />
  //             </IconButton>
  //             <Avatar />
  //             <IconButton as={PrefetchLink} to="/app/settings">
  //               <FiSettings />
  //             </IconButton>
  //           </>
  //         }
  //       >
  //         {route &&
  //           route.routes &&
  //           route.routes
  //             .filter(r => !!r.name)
  //             .map(r => {
  //               return (
  //                 <SidebarItem
  //                   icon={r.icon}
  //                   exact={r.exact}
  //                   to={r.path as string}
  //                 >
  //                   {r.name}
  //                 </SidebarItem>
  //               );
  //             })}
  //       </Sidebar>
  //       <Main>{route && renderRoutes(route.routes)}</Main>
  //     </>
  //   </ThemeProvider>
  // );

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
