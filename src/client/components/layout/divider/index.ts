import styled, { css } from 'styled-components';

import { MapBorder } from '@/client/styles/maps';

interface DividerProps {
  horizontalMargin?: boolean;
}

export const Divider = styled.hr<DividerProps>`
  border: none;
  border-top: 2px solid ${MapBorder};
  ${props =>
    props.horizontalMargin
      ? css`
          margin: 1.5rem 1rem;
        `
      : css`
          margin: 1.5rem 0;
        `}
`;

Divider.defaultProps = {
  horizontalMargin: false,
};
