import styled, { css } from 'styled-components';

import { color, rgba, radius } from '@/client/styles/utils';

export const Alert = styled.div`
  padding: 1rem;
  ${color(
    'primary',
    ({ main, darken }) => css`
      background-color: ${rgba(main, 0.2)};
      color: ${darken};
      border: 2px solid ${main};
      border-radius: ${radius(1.5)};
    `
  )}
`;
