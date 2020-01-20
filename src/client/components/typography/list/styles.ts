import styled, { css } from 'styled-components';
import { theme, ifProp } from 'styled-tools';

import { ListProps, ListItemProps } from './index.dto';

export const Container = styled.ul<ListProps>`
  margin: 0;
  padding-left: 1.5rem;
  ${ifProp(
    'gutterBottom',
    css`
      margin-bottom: 1rem;
    `
  )}
`;

export const Item = styled.li<ListItemProps>`
  font-size: ${theme('font.sizes.sm')};
  padding-left: 0.25rem;
  line-height: 1.25;
  ${ifProp(
    'disabled',
    css`
      text-decoration: line-through;
      color: ${theme('colors.disabledText.main')};
    `
  )}
`;
