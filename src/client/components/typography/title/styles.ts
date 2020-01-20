import styled, { css } from 'styled-components';
import { theme, ifProp } from 'styled-tools';

import { TitleProps } from './index.dto';

export const Container = styled.h1<TitleProps>`
  color: ${theme('colors.background.contrast')};
  font-size: ${theme('font.sizes.xl')};
  font-weight: ${theme('font.weights.medium')};
  margin-top: 0;
  margin-bottom: 0;
  ${ifProp(
    'gutterBottom',
    css`
      margin-bottom: 1.5rem;
    `
  )}
`;
