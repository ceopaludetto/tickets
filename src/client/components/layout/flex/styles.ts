import styled, { css } from 'styled-components';
import { theme } from 'styled-tools';

import { withResponsiveProps } from '@/client/utils/styles';

import { FlexProps, FlexItemProps } from './index.dto';

export const Row = styled.div<FlexProps>`
  display: flex;
  margin: 0 -1rem;
  ${withResponsiveProps(
    ['alignItems', 'justifyContent', 'flexWrap'],
    (p, v, r) =>
      css`
        @media (min-width: ${theme(`breakpoints.${r}`)}px) {
          ${p}: ${v}
        }
      `
  )}
`;

export const Col = styled.div<FlexItemProps>`
  padding: 0 1rem;
  ${withResponsiveProps(
    ['size'],
    (p, v, r) => css`
      @media (min-width: ${theme(`breakpoints.${r}`)}px) {
        flex: 0 0 ${v > 12 ? 100 : (100 / 12) * Number(v)}%;
      }
    `
  )}
`;
