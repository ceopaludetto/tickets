import styled, { css } from 'styled-components';
import { theme, ifNotProp, ifProp } from 'styled-tools';

import { Label as DefaultLabel } from '@/client/components/typography';
import { getThemeColor } from '@/client/utils/styles';

import { ControlProps } from './index.dto';

export const Container = styled.div`
  margin-bottom: 1rem;
`;

export const Append = styled.div`
  padding-right: 0.5rem;
  display: flex;
  align-items: center;
`;

export const Helper = styled.div`
  margin-top: 0.75rem;
`;

export const Label = styled(DefaultLabel)`
  position: absolute;
  left: 0.65rem;
  user-select: none;
  font-weight: ${theme('font.weights.medium')};
  top: 50%;
  pointer-events: none;
  color: ${theme('colors.paper.contrast')};
  transform: translateY(-50%);
  transition: font-size 100ms ease-in-out, top 100ms ease-in-out;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  padding: 1.55rem 0.65rem 0.45rem;
  border-radius: 6px;
  background-color: transparent;
  font-size: 1rem;
  max-width: 100%;
  color: ${theme('color.background.contrast')};
  &:disabled {
    user-select: none;
  }
  &:focus {
    outline: none;
  }
  &:not(:placeholder-shown) {
    & + ${Label} {
      font-size: ${theme('font.sizes.xs')};
      top: 27.5%;
    }
  }
`;

export const FormGroup = styled.div<ControlProps & { noLabel: boolean; disabled: boolean }>`
  border-radius: ${theme('shape.radius')};
  background-color: ${theme('colors.background.hover')};
  border: 2px solid;
  border-color: ${theme('colors.background.active')};
  display: flex;
  align-items: stretch;
  position: relative;
  transition: background-color 100ms ease-in-out, box-shadow 100ms ease-in-out, border-color 100ms ease-in-out;
  ${ifNotProp(
    'disabled',
    css`
      &:hover {
        background-color: ${theme('colors.background.main')};
      }
      &:focus-within {
        background-color: ${theme('colors.background.main')};
        box-shadow: 0 0 0 3px ${getThemeColor('shadows.3')};
        border-color: ${getThemeColor('active')};
        & ${Label} {
          font-size: ${theme('font.sizes.sm')};
          top: 27.5%;
        }
      }
      ${ifProp(
        'error',
        css`
          border-color: ${theme('colors.danger.main')} !important;
          &:focus-within {
            box-shadow: 0 0 0 3px ${theme('colors.danger.shadows.3')};
          }
          ${Label} {
            color: ${theme('colors.danger.main')};
          }
          & + ${Helper} {
            color: ${theme('colors.danger.main')};
          }
        `
      )}
    `
  )}
  ${ifProp(
    'noLabel',
    css`
      ${Input} {
        padding: 1rem 0.65rem;
      }
    `
  )}
  ${ifProp(
    'disabled',
    css`
      background-color: ${theme('colors.disabled.main')};
      border-color: ${theme('colors.disabled.active')};
      ${Label} {
        color: ${theme('colors.disabledText.main')};
      }
    `
  )}
`;
