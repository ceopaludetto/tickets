import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { Theme } from '@/client/providers/theme';

interface ButtonProps {
  variant?: 'primary' | 'danger' | 'error' | 'black';
  block?: boolean;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  padding: 0.65rem 1.75rem;
  font-weight: 400;
  text-transform: capitalize;
  letter-spacing: 1.1px;
  transition: background-color 150ms ease-in-out, box-shadow 150ms ease-in-out;
  cursor: pointer;
  ${props => {
    const variant = props.variant || 'primary';
    const block = props.block || false;
    const { radius, colors } = props.theme as Theme;
    // eslint-disable-next-line security/detect-object-injection
    const { text, main, darken, rgb } = colors[variant];

    return css`
      background-color: ${main};
      color: ${text};
      border-radius: ${radius};
      ${block &&
        css`
          width: 100%;
        `}
      &:hover,
      &:active,
      &:focus {
        background-color: ${darken};
      }
      &:active,
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${rgba(rgb.red, rgb.green, rgb.blue, 0.3)};
      }
    `;
  }}
`;

Button.defaultProps = {
  variant: 'primary',
  block: false,
};
