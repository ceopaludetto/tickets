import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { color, constantColor } from '@/client/styles/utils';
import { MapContrastText, MapBorder } from '@/client/styles/maps';

const activeClassName = 'active';

export const NavItem = styled(NavLink)`
  padding: 1rem 0;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  color: ${constantColor('label')};
  margin-bottom: -1px;
  border-bottom: 1px solid ${MapBorder};
  &.${activeClassName} {
    ${color(
      'primary',
      ({ main }) => css`
        border-bottom: 1px solid ${main};
        color: ${MapContrastText};
      `
    )}
  }
  & + a {
    margin-left: 1rem;
  }
`;

NavItem.defaultProps = {
  activeClassName,
};
