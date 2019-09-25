import styled, { css } from 'styled-components';

import { mapContrastText, fontWeight } from '@/client/styles/maps';

interface TitleProps {
  hasMargin?: boolean;
}

export const Title = styled.h1<TitleProps>`
  font-size: 2rem;
  font-weight: ${fontWeight('medium')};
  letter-spacing: 1.1px;
  margin-bottom: 0;
  color: ${mapContrastText};
  ${props =>
    props.hasMargin &&
    css`
      margin-bottom: 1.75rem;
    `}
`;

Title.defaultProps = {
  hasMargin: true,
};
