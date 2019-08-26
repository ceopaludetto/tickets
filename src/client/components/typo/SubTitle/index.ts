import styled, { css } from 'styled-components';

import { Theme } from '@/client/providers/theme';

export const SubTitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1.75rem;
  ${props => {
    const { main } = (props.theme as Theme).colors.primary;

    return css`
      color: ${main};
    `;
  }}
`;
