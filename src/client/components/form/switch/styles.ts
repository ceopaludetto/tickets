import styled from 'styled-components';
import { theme } from 'styled-tools';

import { Label as DefaultLabel } from '@/client/components/typography';
import { getThemeColor } from '@/client/utils/styles';

import { SwitchProps } from './index.dto';

export const Wrapper = styled.div`
  height: 26px;
  width: 40px;
  position: relative;
`;

export const Label = styled(DefaultLabel)`
  display: inline-block;
  margin-bottom: 0.25rem;
`;

export const Switch = styled.div`
  pointer-events: none;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100% - 4px);
    background-color: ${theme('colors.background.hover')};
    border: 2px solid;
    border-color: ${theme('colors.background.active')};
    border-radius: 20px;
    transition: create-transition((background-color, border-color, box-shadow), 100ms, ease-in-out);
  }
  &::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 4px;
    width: 18px;
    height: calc(100% - 8px);
    background-color: ${theme('colors.primary.contrast')};
    border-radius: 50%;
    transition: create-transition((transform, background-color), 100ms, ease-in-out);
  }
`;

export const Input = styled.input<SwitchProps>`
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
      box-shadow: 0 0 0 3px ${getThemeColor('shadow.3')};
    }
  }
  &:checked {
    & + ${Switch} {
      &::before {
        border-color: ${getThemeColor('active')};
        background-color: ${getThemeColor('main')};
      }
      &::after {
        transform: translateX(18px);
        background-color: ${getThemeColor('contrast')};
      }
    }
  }
`;

export const Container = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;
