import styled, { css } from 'styled-components';

import { Theme } from '@/client/providers/theme';
import { radius, rgba } from '@/client/styles/utils';
import { darklizer } from '@/client/styles/maps';

interface ButtonProps {
  color?: 'primary' | 'danger' | 'error';
  variant?: 'contained' | 'text';
  block?: boolean;
  hasMargin?: boolean;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  padding: 0 1rem;
  font-weight: 500;
  text-transform: capitalize;
  transition: background-color 150ms ease-in-out, box-shadow 150ms ease-in-out;
  height: 2.28571em;
  line-height: 2.28571em;
  border-radius: ${radius()};
  cursor: pointer;
  ${props => {
    const variant = props.variant || 'contained';
    const color = props.color || 'primary';
    const block = props.block || false;
    const hasMargin = props.hasMargin || false;
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
      ${hasMargin &&
        css`
          margin-bottom: 1.5rem;
        `}
    `;

    if (variant === 'text') {
      return css`
        background-color: transparent;
        color: ${darklizer(main)};
        ${common}
        &:hover, &:focus {
          background-color: ${darklizer(rgba(main, 0.1))};
        }
        &:active {
          background-color: ${darklizer(rgba(main, 0.2))};
        }
      `;
    }

    return css`
      background-color: ${darklizer(main)};
      color: ${text};
      ${common}
      &:hover {
        background-color: ${darklizer(lighten)};
      }
      &:active {
        background-color: ${darklizer(darken)};
      }
      &:focus {
        box-shadow: 0 0 0 2px ${darklizer(rgba(main, 0.3))};
      }
    `;
  }}
`;

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  block: false,
};
