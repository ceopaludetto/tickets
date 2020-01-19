import styled, { css } from 'styled-components';
import { theme, withProp } from 'styled-tools';

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${theme('layout.columns')}, 1fr);
  column-gap: ${theme('layout.gutter')};
`;

export const Item = styled.div<GridItemProps>`
  @media (min-width: ${theme('breakpoints.xs')}px) {
    ${withProp(
      'size.xs',
      v => css`
        grid-column: span ${v};
      `
    )}
  }

  @media (min-width: ${theme('breakpoints.sm')}px) {
    ${withProp(
      'size.sm',
      v => css`
        grid-column: span ${v};
      `
    )}
  }

  @media (min-width: ${theme('breakpoints.md')}px) {
    ${withProp(
      'size.md',
      v => css`
        grid-column: span ${v};
      `
    )}
  }

  @media (min-width: ${theme('breakpoints.lg')}px) {
    ${withProp(
      'size.lg',
      v => css`
        grid-column: span ${v};
      `
    )}
  }

  @media (min-width: ${theme('breakpoints.xl')}px) {
    ${withProp(
      'size.xl',
      v => css`
        grid-column: span ${v};
      `
    )}
  }
`;
