import styled, { css } from 'styled-components';

import { Theme } from '@/client/providers/theme';
import { MapBackgroundDarken } from '@/client/styles/utils';

interface PaperProps {
  isElevated?: boolean;
}

export const Paper = styled.div<PaperProps>`
  padding: 1.5rem 2.5rem;
  background-color: ${MapBackgroundDarken};
  transition: box-shadow 125ms ease-in-out;
  ${props =>
    props.isElevated &&
    css`
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    `}
  ${props => {
    const { radius } = props.theme as Theme;

    return css`
      border-radius: ${radius * 1.25}px;
    `;
  }}
`;

Paper.defaultProps = {
  isElevated: true,
};
