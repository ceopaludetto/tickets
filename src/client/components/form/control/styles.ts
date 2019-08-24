/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { Theme } from '@/client/providers/theme';
import {
  MapBorder,
  MapBackground,
  MapBackgroundDarken,
} from '@/client/styles/utils';

export const Root = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  display: inline-block;
  margin-bottom: 0.35rem;
  font-weight: 600;
  ${props => {
    const { label } = (props.theme as Theme).colors;

    return css`
      color: ${label};
    `;
  }}
`;

const Commons = css`
  border: 2px solid ${MapBorder};
  background-color: ${MapBackground};
  padding: 0 0.4rem;
  align-items: center;
  display: inline-flex;
  transition: border-color 150ms ease-in-out, background-color 100ms ease-in-out;
`;

export const Append = styled.div`
  ${Commons}
  border-left: none;
  order: 2;
  ${props => {
    const { radius } = props.theme as Theme;

    return css`
      border-radius: 0 ${radius}px ${radius}px 0;
    `;
  }}
`;

export const Prepend = styled.div`
  ${Commons}
  border-right: none;
  order: 0;
  ${props => {
    const { radius } = props.theme as Theme;

    return css`
      border-radius: ${radius} 0 0 ${radius};
    `;
  }}
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
  ${props => {
    const { append, prepend } = props;
    const { radius, colors } = props.theme as Theme;
    const { main } = colors.primary;

    return css`
      border-radius: ${radius}px;
      ${append &&
        css`
          border-right: none;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        `}
      ${prepend &&
        css`
          border-left: none;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        `}
      &:focus, &:focus + ${Append}, &:focus + ${Prepend} {
        outline: none;
        border-color: ${main};
        background-color: ${colors.white}!important;
      }
    `;
  }}
`;

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  transition: box-shadow 150ms ease-in-out;
  &:hover {
    ${Append}, ${Prepend}, ${Input} {
      background-color: ${MapBackgroundDarken};
    }
  }
  ${props => {
    const { colors, radius } = props.theme as Theme;
    const { rgb } = colors.primary;

    return css`
      border-radius: ${radius}px;
      &:focus-within {
        box-shadow: 0 0 0 2px ${rgba(rgb.red, rgb.green, rgb.blue, 0.3)};
      }
    `;
  }}
`;
