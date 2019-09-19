import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { darklizer } from '@/client/styles/maps';
import { color } from '@/client/styles/utils';

export const Link = styled(RouterLink)`
  text-decoration: none;
  ${color(
    'primary',
    ({ main, darken }) => css`
      color: ${darklizer(main)};
      &:hover {
        color: ${darklizer(darken)};
        text-decoration: underline;
      }
    `
  )}
`;
