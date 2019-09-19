import { cloneElement } from 'react';
import styled from 'styled-components';

import { mapBorder, mapContrastText, mapLabel } from '@/client/styles/maps';
import { radius } from '@/client/styles/utils';

export const IconButton = styled(
  ({ as: component = 'button', children, ...props }) =>
    cloneElement(component, props, children)
)`
  border-radius: ${radius(1.5)};
  padding: 0.45rem;
  background-color: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  transition: background-color 125ms ease-in-out, color 125ms ease-in-out;
  color: ${mapLabel}!important;
  cursor: pointer;
  &:hover,
  &:focus,
  &.active {
    outline: none;
    background-color: ${mapBorder};
    color: ${mapContrastText}!important;
  }
  svg {
    width: 18px;
    height: 18px;
  }
`;

IconButton.defaultProps = {
  as: 'button',
};
