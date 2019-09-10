import styled, { css } from 'styled-components';

import { MapBorder } from '@/client/styles/maps';

interface DividerProps {
  horizontalMargin?: boolean;
  doubleMargin?: boolean;
}

export const Divider = styled.hr<DividerProps>`
  border: none;
  border-top: 2px solid ${MapBorder};
  ${props =>
    props.doubleMargin
      ? css`
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        `
      : css`
          margin-top: 1rem;
          margin-bottom: 1rem;
        `}
  ${props =>
    props.horizontalMargin &&
    css`
      margin-left: 1rem;
      margin-right: 1rem;
    `}
`;

Divider.defaultProps = {
  horizontalMargin: false,
  doubleMargin: true,
};
