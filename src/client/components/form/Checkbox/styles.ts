import styled, { css } from 'styled-components';

import { Label } from '@/client/components/typo';
import { color, rgba, radius, constantColor } from '@/client/styles/utils';
import { MapBorder, MapBackgroundInverted } from '@/client/styles/maps';

export const Root = styled.div`
  margin-bottom: 1rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Check = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius()};
  width: 18px;
  height: 18px;
  padding: 2px;
  margin-right: 0.65rem;
  background-color: ${MapBorder};
  transition: background-color 100ms ease-in-out, box-shadow 100ms ease-in-out;
  order: -1;
  svg {
    color: ${constantColor('white')};
  }
  &:active {
    background-color: ${MapBackgroundInverted}!important;
  }
`;

export const CustomLabel = styled(Label)`
  &:active ~ ${Check} {
    background-color: ${MapBackgroundInverted}!important;
  }
`;

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -1;
  &:focus ~ ${Check} {
    ${color(
      'primary',
      ({ main }) =>
        css`
          box-shadow: 0 0 0 2px ${rgba(main, 0.3)};
        `
    )}
  }
  &:checked ~ ${Check}, &:indeterminate ~ ${Check} {
    ${color(
      'primary',
      ({ main }) =>
        css`
          background-color: ${main};
        `
    )}
  }
`;
