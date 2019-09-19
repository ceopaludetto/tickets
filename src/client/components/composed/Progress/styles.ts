import styled, { css } from 'styled-components';

import { color } from '@/client/styles/utils';
import { darklizer } from '@/client/styles/maps';

interface ContainerProps {
  animationDuration: number;
  isFinished: boolean;
}

export const Container = styled.div<ContainerProps>`
  pointer-events: none;
  position: fixed;
  z-index: 1030;
  top: 0;
  left: 0;
  width: 100%;
  ${props => css`
    transition: opacity ${props.animationDuration}ms ease;
    opacity: ${props.isFinished ? 0 : 1};
  `}
`;

export const BarContainer = styled.div<Omit<ContainerProps, 'isFinished'>>`
  height: 2px;
  position: fixed;
  left: 0;
  top: 0;
  ${color(
    'primary',
    ({ main }, { animationDuration }) => css`
      background-color: ${darklizer(main)};
      transition: width ${animationDuration}ms ease;
    `
  )}
`;

export const BarShadow = styled.div`
  display: block;
  height: 100%;
  opacity: 1;
  position: absolute;
  right: 0px;
  transform: rotate(3deg) translate(0px, -4px);
  width: 100px;
  ${color(
    'primary',
    ({ main }) => css`
      box-shadow: 0 0 10px ${darklizer(main)}, 0 0 5px ${darklizer(main)};
    `
  )}
`;
