import styled from 'styled-components';
import { theme } from 'styled-tools';

import { getThemeColor } from '@/client/utils/styles';

import { IconButtonProps } from './index.dto';

export const Container = styled.button<IconButtonProps>`
  border: none;
  border-radius: 6px;
  background-color: transparent;
  transition: background-color 100ms ease-in-out, box-shadow 100ms ease-in-out;
  padding: 0.375rem;
  height: 36px;
  &:focus {
    outline: none;
  }
  &:not(:disabled) {
    cursor: pointer;
    color: ${getThemeColor('main')};
    &:hover {
      background-color: ${getThemeColor('shadow.2')};
    }
    &:active,
    &:focus {
      box-shadow: 0 0 0 3px ${getThemeColor('shadow.1')};
      background-color: ${getThemeColor('shadow.3')};
    }
  }
  &:disabled {
    cursor: not-allowed;
    background-color: transparent;
    color: ${theme('colors.disabledText.main')};
  }
`;
