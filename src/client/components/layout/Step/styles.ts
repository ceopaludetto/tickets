import styled, { css } from 'styled-components';

import {
  mapBorder,
  mapContrastText,
  mapLabel,
  darklizer,
} from '@/client/styles/maps';
import { color } from '@/client/styles/utils';

export interface StatusProp {
  status?: 'done' | 'undone' | 'active';
}

export const Content = styled.div<StatusProp>`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  color: ${mapLabel};
  font-size: 1rem;
  text-transform: capitalize;
  line-height: 1.7;
  ${props =>
    props.status === 'active' &&
    css`
      color: ${mapContrastText};
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
  background-color: ${mapBorder};
  ${color(
    'primary',
    ({ main }, { status }) =>
      status === 'done' &&
      css`
        background-color: ${darklizer(main)};
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
        color: ${darklizer(main)};
      `;
    }

    return css`
      color: ${mapBorder};
    `;
  })}
`;
