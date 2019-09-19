import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { color } from '@/client/styles/utils';
import { mapContrastText, mapLabel, darklizer } from '@/client/styles/maps';

const activeClassName = 'active';

export const NavItem = styled(NavLink)`
  padding: 1rem 0;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  color: ${mapLabel};
  margin-bottom: -2px;
  border-bottom: 2px solid transparent;
  transition: border-color 200ms ease-in-out;
  &.${activeClassName} {
    color: ${mapContrastText};
    ${color(
      'primary',
      ({ main }) => css`
        border-color: ${darklizer(main)};
      `
    )}
  }
  &:hover {
    text-decoration: none;
    color: ${mapContrastText};
  }
  & + a {
    margin-left: 1.5rem;
  }
`;

NavItem.defaultProps = {
  activeClassName,
};
