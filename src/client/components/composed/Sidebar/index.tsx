import React from 'react';

import { Container, Items, Profile } from './styles';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  profileContent?: React.ReactNode;
}

export function Sidebar({ children, profileContent, ...rest }: SidebarProps) {
  return (
    <Container {...rest}>
      <Items>{children}</Items>
      <Profile>{profileContent}</Profile>
    </Container>
  );
}

export { SidebarItem } from './item';
