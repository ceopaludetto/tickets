import styled, { css } from 'styled-components';
import { Theme } from '@/client/providers/theme';

export const Paper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  padding: 1.5rem 2.5rem;
  ${props => {
    const { colors, radius } = props.theme as Theme;
    const { white } = colors;

    return css`
      background-color: ${white};
      border-radius: ${radius * 1.25}px;
    `;
  }}
`;
