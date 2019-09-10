import styled, { css } from 'styled-components';

import { color } from '@/client/styles/utils';

export const Primary = styled.span`
  ${color(
    'primary',
    ({ main }) =>
      css`
        color: ${main};
      `
  )}
`;
