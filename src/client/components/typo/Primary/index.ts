import styled, { css } from 'styled-components';

import { darklizer } from '@/client/styles/maps';
import { color } from '@/client/styles/utils';

export const Primary = styled.span`
  ${color(
    'primary',
    ({ main }) =>
      css`
        color: ${darklizer(main)};
      `
  )}
`;
