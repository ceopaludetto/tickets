import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';
import { useQuery } from '@apollo/react-hooks';
import { FiSettings, FiSearch } from 'react-icons/fi';

import { Content, GlobalBackground } from './styles';
import { Sidebar, SidebarItem } from '@/client/components/composed';
import { IconButton } from '@/client/components/form';
import { PrefetchLink } from '@/client/components/typo';
import { Theme } from '@/client/graphql/local.gql';
import { Mode } from '@/client/providers/theme';

export default function App({ route }: RouteConfigComponentProps) {
  const { data } = useQuery(Theme);
  const theme = useContext(ThemeContext);

  return (
    <ThemeProvider
      theme={{ ...theme, mode: data.isDark ? Mode.Dark : Mode.Light }}
    >
      <>
        <GlobalBackground />
        <Sidebar
          profileContent={
            <>
              <IconButton>
                <FiSearch />
              </IconButton>
              <IconButton as={PrefetchLink} to="/app/settings">
                <FiSettings />
              </IconButton>
            </>
          }
        >
          {route &&
            route.routes &&
            route.routes
              .filter(r => !!r.name)
              .map(r => {
                return (
                  <SidebarItem
                    icon={r.icon}
                    exact={r.exact}
                    to={r.path as string}
                  >
                    {r.name}
                  </SidebarItem>
                );
              })}
        </Sidebar>
        <Content>{route && renderRoutes(route.routes)}</Content>
      </>
    </ThemeProvider>
  );
}
