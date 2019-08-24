import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { Theme } from '@/client/providers/theme';

interface ButtonProps {
  variant?: 'primary' | 'danger' | 'error';
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
  cursor: pointer;
  ${props => {
    const variant = props.variant || 'primary';
    const block = props.block || false;
    const { radius, colors } = props.theme as Theme;
    // eslint-disable-next-line security/detect-object-injection
    const { text, main, darken, lighten } = colors[variant];

    return css`
      background-color: ${main};
      color: ${text};
      border-radius: ${radius}px;
      ${block &&
        css`
          width: 100%;
        `}
      &:hover {
        background-color: ${lighten};
      }
      &:active {
        background-color: ${darken};
      }
      &:focus {
        outline: none;
      }
    `;
  }}
`;

Button.defaultProps = {
  variant: 'primary',
  block: false,
};
