import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { color } from '@/client/styles/utils';

export const Link = styled(RouterLink)`
  text-decoration: none;
  ${color(
    'primary',
    ({ main, darken }) => css`
      color: ${main};
      &:hover {
        color: ${darken};
        text-decoration: underline;
      }
    `
  )}
`;
