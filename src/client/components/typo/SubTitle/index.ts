import styled, { css } from 'styled-components';

import { color } from '@/client/styles/utils';

export const SubTitle = styled.h2`
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  ${color(
    'primary',
    ({ main }) => css`
      color: ${main};
    `
  )}
`;
