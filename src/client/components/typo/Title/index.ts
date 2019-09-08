import styled, { css } from 'styled-components';

import { MapContrastText } from '@/client/styles/maps';

interface TitleProps {
  hasMargin?: boolean;
}

export const Title = styled.h1<TitleProps>`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 1.1px;
  margin-bottom: 0;
  color: ${MapContrastText};
  ${props =>
    props.hasMargin &&
    css`
      margin-bottom: 1.75rem;
    `}
`;

Title.defaultProps = {
  hasMargin: true,
};
