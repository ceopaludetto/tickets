import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import {
  MapBackground,
  MapBorder,
  MapContrastText,
} from '@/client/styles/maps';
import { constantColor, color } from '@/client/styles/utils';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  position: fixed;
  width: 250px;
  flex-direction: column;
  background-color: ${MapBackground};
  border-right: 2px solid ${MapBorder};
`;

export const Items = styled.div`
  flex: 1;
  display: block;
`;

export const Profile = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled.span`
  padding-right: 0.75rem;
  padding-left: 0.5rem;
  display: inline-flex;
  align-items: center;
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const Item = styled(NavLink)`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  padding: 0.5rem 0.75rem 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  text-transform: capitalize;
  width: 100%;
  text-decoration: none;
  align-items: center;
  color: ${constantColor('label')};
  ${Icon} {
    color: ${constantColor('label')};
  }
  & + a {
    margin-top: 0.25rem;
  }
  &:hover {
    text-decoration: none;
    color: ${MapContrastText};
    ${Icon} {
      color: ${MapContrastText};
    }
  }
  &::before {
    content: '';
    width: 0px;
    height: 60%;
    top: 20%;
    left: 0%;
    display: block;
    position: absolute;
    transition: width 125ms ease-in-out;
    ${color(
      'primary',
      ({ main }) =>
        css`
          background-color: ${main};
        `
    )}
  }
  &.active {
    color: ${MapContrastText};
    ${Icon} {
      color: ${MapContrastText};
    }
    &::before {
      width: 3px;
    }
  }
`;

Item.defaultProps = {
  activeClassName: 'active',
};
