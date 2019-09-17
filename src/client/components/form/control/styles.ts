/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { css } from 'styled-components';

import {
  MapBorder,
  MapBackground,
  MapBackgroundDarken,
  MapFocus,
  MapContrastText,
} from '@/client/styles/maps';
import { radius, rgba, color, multipleColor } from '@/client/styles/utils';

export const Root = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const Commons = css`
  background-color: ${MapBackground};
  padding: 0 0.4rem;
  align-items: center;
  display: inline-flex;
  transition: border-color 150ms ease-in-out, background-color 100ms ease-in-out;
  border: none;
  color: ${MapContrastText};
`;

export const Append = styled.div`
  ${Commons}
  border-left: none;
  order: 2;
`;

export const Prepend = styled.div`
  ${Commons}
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
  padding: 0.4rem;
  color: ${MapContrastText};
  &:focus,
  &:focus + ${Append}, &:focus + ${Prepend} {
    outline: none;
    background-color: ${MapFocus}!important;
  }
`;

interface ContainerProps {
  hasError?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: stretch;
  transition: box-shadow 150ms ease-in-out, border-color 150ms ease-in-out;
  border: 2px solid ${MapBorder};
  border-radius: ${radius()};
  &:hover {
    ${Append}, ${Prepend}, ${Input} {
      background-color: ${MapBackgroundDarken};
    }
  }
  ${multipleColor(['primary', 'error'], ([primary, error], { hasError }) =>
    hasError
      ? css`
          border-color: ${error.main};
          &:focus-within {
            box-shadow: 0 0 0 2px ${rgba(error.main, 0.3)};
          }
        `
      : css`
          &:focus-within {
            border-color: ${primary.main};
            box-shadow: 0 0 0 2px ${rgba(primary.main, 0.3)};
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
      color: ${main};
    `
  )}
`;
