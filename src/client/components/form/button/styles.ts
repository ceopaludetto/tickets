import { LinkProps } from 'react-router-dom';

import styled, { css } from 'styled-components';
import { theme, switchProp } from 'styled-tools';

import { getThemeColor } from '@/client/utils/styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'flat';
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export interface PrefetchLinkProps extends LinkProps {
  variant?: 'contained' | 'flat';
  color?: 'primary' | 'secondary' | 'background' | 'paper';
}

export const Container = styled.button<ButtonProps | PrefetchLinkProps>`
  border: none;
  border-radius: ${theme('shape.radius')};
  padding: 0.65rem 1.25rem;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  font-weight: ${theme('font.weights.medium')};
  font-size: ${theme('font.sizes.sm')};
  text-decoration: none;
  transition: box-shadow 100ms ease-in-out, background-color 100ms ease-in-out;
  &:focus {
    outline: none;
  }
  &:not(:disabled) {
    cursor: pointer;
    ${switchProp('variant', {
      contained: css`
        background-color: ${getThemeColor('main')};
        color: ${getThemeColor('contrast')};
        &:hover {
          background-color: ${getThemeColor('hover')};
        }
        &:focus,
        &:active {
          background-color: ${getThemeColor('active')};
          box-shadow: 0 0 0 3px ${getThemeColor('shadows.3')};
        }
      `,
      flat: css`
        background-color: transparent;
        color: ${getThemeColor('main')};
        &:hover {
          background-color: ${getThemeColor('shadows.2')};
        }
        &:focus,
        &:active {
          background-color: ${getThemeColor('shadows.3')};
          box-shadow: 0 0 0 3px ${getThemeColor('shadows.1')};
        }
      `,
    })}
  }
  &:disabled {
    cursor: not-allowed;
    ${switchProp('variant', {
      contained: css`
        background-color: ${theme('palette.disabled.main')};
        color: ${theme('palette.disabledText.main')};
      `,
      flat: css`
        background-color: transparent;
        color: ${theme('palette.disabledText.main')};
      `,
    })}
  }
`;
