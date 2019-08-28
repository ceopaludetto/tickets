import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { MapBorder, MapContrastText } from '@/client/styles/maps';
import { Theme } from '@/client/providers/theme';

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: ${MapContrastText};
  font-size: 0.8rem;
  text-transform: uppercase;
  line-height: 1.7;
`;

export interface ContainerProps {
  inverted?: boolean;
}

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-right: 1rem;
  align-items: center;
  flex-direction: column;
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: stretch;
  ${props =>
    props.inverted &&
    css`
      ${Content} {
        text-align: right;
        order: -1;
      }

      ${IconContainer} {
        padding-left: 1rem;
        padding-right: 0;
      }
    `}
`;

export interface IconProps {
  status?: 'done' | 'undone' | 'active';
}

export const Tail = styled.hr<IconProps>`
  height: 30px;
  border: none;
  border-right: 2px solid ${MapBorder};
  ${props =>
    props.status === 'done' &&
    css`
      border-color: ${(props.theme as Theme).colors.primary.main};
    `}
`;

export const Icon = styled.span<IconProps>`
  border-radius: 50%;
  display: block;
  margin: 0.45rem 0;
  width: 8px;
  height: 8px;
  ${props => {
    const { main, rgb } = (props.theme as Theme).colors.primary;
    const status = props.status || 'undone';

    if (status === 'active') {
      return css`
        background-color: ${main};
        box-shadow: 0 0 0 2px ${rgba(rgb.red, rgb.green, rgb.blue, 0.3)};
      `;
    }

    if (status === 'done') {
      return css`
        background-color: ${main};
      `;
    }

    return css`
      background-color: ${MapBorder};
    `;
  }}
`;
