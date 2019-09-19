import styled, { css } from 'styled-components';

import { color } from '@/client/styles/utils';
import { darklizer } from '@/client/styles/maps';

export const SubTitle = styled.h2`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0;
  ${color(
    'primary',
    ({ main }) => css`
      color: ${darklizer(main)};
    `
  )}
`;
