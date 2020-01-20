import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { theme, ifProp, ifNotProp } from 'styled-tools';

import { PaperProps } from './index.dto';

export const Container = styled(motion.div)<PaperProps>`
  background-color: ${theme('colors.paper.main')};
  border-radius: 6px;
  ${ifProp(
    'elevate',
    css`
      box-shadow: 0 0.75rem 1.5rem get-theme-color('paper-shadow');
    `
  )}
  ${ifProp(
    'border',
    css`
      border: 1px solid ${theme('colors.background.active')};
    `
  )} 
  ${ifNotProp(
    'hasInner',
    css`
      padding: 2rem;
      ${ifProp(
        'small',
        css`
          padding: 1rem;
        `
      )}
    `
  )}
`;

export const Inner = styled.div<Pick<PaperProps, 'small'>>`
  padding: 2rem;
  ${ifProp(
    'small',
    css`
      padding: 1rem;
    `
  )}
`;
