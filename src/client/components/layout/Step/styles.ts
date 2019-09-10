import styled, { css } from 'styled-components';

import { MapBorder, MapContrastText } from '@/client/styles/maps';
import { color, constantColor } from '@/client/styles/utils';

export interface StatusProp {
  status?: 'done' | 'undone' | 'active';
}

export const Content = styled.div<StatusProp>`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  color: ${constantColor('label')};
  font-size: 1rem;
  text-transform: capitalize;
  line-height: 1.7;
  ${props =>
    props.status === 'active' &&
    css`
      color: ${MapContrastText};
    `}
`;

export interface ContainerProps {
  inverted?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const Tail = styled.hr<StatusProp>`
  height: 2px;
  border: none;
  flex: 1;
  margin: 0 1rem;
  background-color: ${MapBorder};
  ${color(
    'primary',
    ({ main }, { status }) =>
      status === 'done' &&
      css`
        background-color: ${main};
      `
  )}
`;

export const Icon = styled.span<StatusProp>`
  display: inline-block;
  margin-right: 0.5rem;
  flex: 1;
  ${color('primary', ({ main }, { status }) => {
    if (status === 'active' || status === 'done') {
      return css`
        color: ${main};
      `;
    }

    return css`
      color: ${MapBorder};
    `;
  })}
`;
