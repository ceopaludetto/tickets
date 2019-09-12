import styled, { css } from 'styled-components';
import {
  Container as BTContainer,
  Row as BTRow,
  Col as BTCol,
} from 'styled-bootstrap-grid';

import { MapBackgroundDarken } from '@/client/styles/maps';
import { Paper } from '@/client/components/layout';

interface StyledContainerProps {
  isRegister?: boolean;
}

export const Container = styled(BTContainer)`
  background-color: ${MapBackgroundDarken};
  height: 100vh;
`;

export const Row = styled(BTRow)<StyledContainerProps>`
  height: 100%;
  @media (min-width: ${props => (props.isRegister ? '900px' : '450px')}) {
    align-items: center;
  }
`;

export const Col = styled(BTCol)<StyledContainerProps>`
  ${props =>
    props.isRegister
      ? css`
          flex: 0 1 900px;
        `
      : css`
          flex: 0 1 450px;
        `}
`;

export const CustomPaper = styled(Paper)`
  padding: 1.5rem 0.5rem;
`;
