import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { Theme } from '@/client/providers/theme';

export const Link = styled(RouterLink)`
  ${props => {
    const { main, darken } = (props.theme as Theme).colors.primary;

    return css`
      color: ${main};
      text-decoration: none;
      &:hover {
        color: ${darken};
        text-decoration: underline;
      }
    `;
  }}
`;
