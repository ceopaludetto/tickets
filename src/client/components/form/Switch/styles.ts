import styled, { css } from 'styled-components';

import { color, rgba } from '@/client/styles/utils';
import {
  mapBorder,
  mapBackground,
  mapContrastText,
  mapBackgroundInverted,
  darklizer,
} from '@/client/styles/maps';

export const Root = styled.div`
  margin-bottom: 1rem;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const SwitchContainer = styled.label`
  position: relative;
  width: 100%;
  padding-left: 3.5rem;
  font-size: 0.9rem;
  color: ${mapContrastText};
  &::before {
    content: '';
    cursor: pointer;
    border-radius: 24px;
    width: 48px;
    height: 24px;
    left: 0;
    top: 0;
    position: absolute;
    display: block;
    background-color: ${mapBorder};
    transition: background-color 100ms ease-in-out, box-shadow 100ms ease-in-out;
  }
  &::after {
    content: '';
    cursor: pointer;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    top: 3px;
    left: 3px;
    position: absolute;
    display: block;
    background-color: ${mapBackground};
    transition: left 100ms ease-in-out;
  }
  &:active {
    &::before {
      background-color: ${mapBackgroundInverted}!important;
    }
  }
`;

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -1;
  &:focus ~ ${SwitchContainer}::before {
    ${color(
      'primary',
      ({ main }) =>
        css`
          box-shadow: 0 0 0 3px ${darklizer(rgba(main, 0.3))};
        `
    )}
  }
  &:checked + ${SwitchContainer} {
    &::before {
      ${color(
        'primary',
        ({ main }) =>
          css`
            background-color: ${darklizer(main)};
          `
      )}
    }
    &::after {
      left: 27px;
    }
  }
`;
