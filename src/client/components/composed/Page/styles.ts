import styled, { css } from 'styled-components';
import { Row, Container as BTContainer } from 'styled-bootstrap-grid';

import { MapBackgroundDarken } from '@/client/styles/maps';

export const Container = styled(BTContainer)`
  background-color: ${MapBackgroundDarken};
  ${props =>
    props.fluid
      ? css`
          padding-top: 1rem;
        `
      : css`
          padding-top: 2.5rem;
        `}
`;

interface HeaderProps {
  hasFooter?: boolean;
}

export const Header = styled(Row)<HeaderProps>`
  ${props =>
    props.hasFooter
      ? css`
          margin-bottom: 0.5rem;
        `
      : css`
          margin-bottom: 1rem;
        `}
`;

export const Footer = styled.div`
  margin-bottom: 1.5rem;
`;

export const Append = styled.div`
  padding: 0 1rem;
`;
