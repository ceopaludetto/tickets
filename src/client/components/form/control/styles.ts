/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { css } from 'styled-components';

import {
  mapBorder,
  mapContrastText,
  mapSidebar,
  darklizer,
} from '@/client/styles/maps';
import { radius, rgba, color, multipleColor } from '@/client/styles/utils';

export const Root = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const Commons = css`
  background-color: ${mapSidebar};
  align-items: center;
  display: inline-flex;
  transition: border-color 150ms ease-in-out, background-color 100ms ease-in-out;
  border: none;
  color: ${mapContrastText};
`;

export const Append = styled.div`
  ${Commons}
  padding: 0 0.4rem;
  border-left: none;
  order: 2;
`;

export const Prepend = styled.div`
  ${Commons}
  padding: 0 0.4rem 0 0.6rem;
  border-right: none;
  order: 0;
`;

interface InputProps {
  append?: boolean;
  prepend?: boolean;
}

export const Input = styled.input<InputProps>`
  ${Commons}
  flex: 1;
  font-size: 1rem;
  order: 1;
  padding: 0.4rem 0.5rem;
  color: ${mapContrastText};
  &:focus,
  &:focus + ${Append}, &:focus + ${Prepend} {
    outline: none;
  }
`;

interface ContainerProps {
  hasError?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: stretch;
  transition: box-shadow 150ms ease-in-out, border-color 150ms ease-in-out;
  border: 2px solid ${mapBorder};
  border-radius: ${radius()};
  overflow: hidden;
  ${multipleColor(['primary', 'error'], ([primary, error], { hasError }) =>
    hasError
      ? css`
          border-color: ${darklizer(error.main)};
          &:focus-within {
            box-shadow: 0 0 0 3px ${darklizer(rgba(error.main, 0.3))};
          }
        `
      : css`
          &:focus-within {
            border-color: ${darklizer(primary.main)};
            box-shadow: 0 0 0 3px ${darklizer(rgba(primary.main, 0.3))};
          }
        `
  )}
`;

export const Error = styled.span`
  font-weight: 400;
  font-size: 0.9rem;
  ${color(
    'error',
    ({ main }) => css`
      color: ${darklizer(main)};
    `
  )}
`;
