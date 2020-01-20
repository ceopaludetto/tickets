import styled, { css } from 'styled-components';
import { switchProp, theme } from 'styled-tools';

import { Label as DefaultLabel } from '@/client/components/typography';
import { getThemeColor } from '@/client/utils/styles';

import { CheckboxProps } from './index.dto';

export const Wrapper = styled.div`
  height: 22px;
  width: 22px;
  position: relative;
`;

export const Icon = styled.div`
  height: 70%;
  width: 70%;
  position: relative;
  z-index: 200;
  display: none;
  stroke-width: 3;
`;

export const Switch = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background-color: ${theme('colors.background.hover')};
    border: 2px solid;
    border-color: ${theme('colors.background.active')};
    border-radius: ${theme('shape.radius')};
    transition: background-color 100ms ease-in-out, box-shadow 100ms ease-in-out, border-color 100ms ease-in-out;
  }
`;

export const Input = styled.input<CheckboxProps>`
  cursor: pointer;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  &:active {
    & + ${Switch} {
      &::before {
        background-color: ${theme('colors.background.main')};
      }
    }
  }
  &:focus {
    & + ${Switch}::before {
      box-shadow: 0 0 0 3px ${getThemeColor('shadows.3')};
    }
  }
  &:checked {
    & + ${Switch} {
      &::before {
        border-color: ${getThemeColor('active')};
        background-color: ${getThemeColor('main')};
      }
      ${Icon} {
        display: block;
        color: ${getThemeColor('contrast')};
      }
    }
  }
`;

export const Label = styled(DefaultLabel)`
  display: inline-block;
  margin-bottom: 0.25rem;
`;

export const FormGroup = styled.div<CheckboxProps>`
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  ${switchProp('labelPlacement', {
    top: css`
      flex-direction: column;
    `,
    right: css`
      flex-direction: row;
      align-items: center;
      ${Wrapper} {
        order: -1;
      }
      ${Label} {
        margin-left: 0.5rem;
        margin-bottom: 0;
      }
    `,
  })}
`;
