import styled, { css } from 'styled-components';

import { Theme } from '@/client/providers/theme';
import { radius, rgba } from '@/client/styles/utils';

interface ButtonProps {
  color?: 'primary' | 'danger' | 'error';
  variant?: 'contained' | 'text';
  block?: boolean;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  padding: 0 1rem;
  font-weight: 500;
  text-transform: capitalize;
  transition: background-color 150ms ease-in-out, box-shadow 150ms ease-in-out;
  height: 2.28571em;
  line-height: 2.28571em;
  border-radius: ${radius()}px;
  cursor: pointer;
  ${props => {
    const variant = props.variant || 'contained';
    const color = props.color || 'primary';
    const block = props.block || false;
    const { colors } = props.theme as Theme;
    const { text, main, darken, lighten } = colors[color];

    const common = css`
      &:focus {
        outline: none;
      }
      ${block &&
        css`
          width: 100%;
        `}
    `;

    if (variant === 'text') {
      return css`
        background-color: transparent;
        color: ${main};
        ${common}
        &:hover, &:focus {
          background-color: ${rgba(main, 0.1)};
        }
        &:active {
          background-color: ${rgba(main, 0.2)};
        }
      `;
    }

    return css`
      background-color: ${main};
      color: ${text};
      ${common}
      &:hover {
        background-color: ${lighten};
      }
      &:active {
        background-color: ${darken};
      }
      &:focus {
        box-shadow: 0 0 0 2px ${rgba(main, 0.3)};
      }
    `;
  }}
`;

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  block: false,
};
