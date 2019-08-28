import styled, { css } from 'styled-components';

import { Theme } from '@/client/providers/theme';
import { radius } from '@/client/styles/utils';

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
  border-radius: ${radius()}px;
  cursor: pointer;
  ${props => {
    const variant = props.variant || 'primary';
    const block = props.block || false;
    const { colors } = props.theme as Theme;
    // eslint-disable-next-line security/detect-object-injection
    const { text, main, darken, lighten } = colors[variant];

    return css`
      background-color: ${main};
      color: ${text};
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
