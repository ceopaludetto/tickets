import styled, { css } from 'styled-components';
import { theme, ifProp } from 'styled-tools';

import { OverlineProps } from './index.dto';

export const Container = styled.small<OverlineProps>`
  color: ${theme('colors.secondary.main')};
  font-size: ${theme('font.sizes.md')};
  font-weight: ${theme('font.weights.medium')};
  text-transform: uppercase;
  letter-spacing: 1.1px;
  ${ifProp(
    'gutterBottom',
    css`
      display: inline-block;
      margin-bottom: 1rem;
    `
  )}
`;
