import styled, { css } from 'styled-components';

import { MapBackgroundDarken } from '@/client/styles/maps';
import { radius } from '@/client/styles/utils';

interface PaperProps {
  isElevated?: boolean;
}

export const Paper = styled.div<PaperProps>`
  padding: 1.5rem 2.5rem;
  background-color: ${MapBackgroundDarken};
  transition: box-shadow 125ms ease-in-out;
  border-radius: ${radius(1.25)}px;
  ${props =>
    props.isElevated &&
    css`
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    `}
`;

Paper.defaultProps = {
  isElevated: true,
};
