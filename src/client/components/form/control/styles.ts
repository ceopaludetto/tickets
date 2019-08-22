/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { css, ThemedStyledProps } from 'styled-components';
import theme from 'styled-theming';
import { rgba } from 'polished';

import { Theme, Mode } from '@/client/providers/theme';

export const Root = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  transition: box-shadow 150ms ease-in-out;
  ${props => {
    const { colors, radius } = props.theme as Theme;
    const { rgb } = colors.primary;

    return css`
      border-radius: ${radius};
      &:focus-within {
        box-shadow: 0 0 0 2px ${rgba(rgb.red, rgb.green, rgb.blue, 0.3)};
      }
    `;
  }}
`;

const MapGray = theme('mode', {
  [Mode.Light]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.white,
  [Mode.Dark]: (props: ThemedStyledProps<any, any>) =>
    (props.theme as Theme).colors.backgroundDark,
});

const Commons = css`
  border: 1px solid ${MapGray};
  background-color: ${MapGray};
  padding: 0 0.65rem;
  align-items: center;
  display: inline-flex;
`;

export const Append = styled.div`
  ${Commons}
  border-left: none;
  order: 2;
  transition: border-color 150ms ease-in-out;
  ${props => {
    const { radius } = props.theme as Theme;

    return css`
      border-radius: 0 ${radius} ${radius} 0;
    `;
  }}
`;

export const Prepend = styled.div`
  ${Commons}
  border-right: none;
  order: 0;
  transition: border-color 150ms ease-in-out;
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
  transition: border-color 150ms ease-in-out;
  padding: 0.65rem;
  ${props => {
    const { append, prepend } = props;
    const { radius, colors } = props.theme as Theme;
    const { main } = colors.primary;

    return css`
      border-radius: ${radius};
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
      &:focus, &:focus + ${Append} {
        outline: none;
        border-color: ${main};
      }
    `;
  }}
`;
