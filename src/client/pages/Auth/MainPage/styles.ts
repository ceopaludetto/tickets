import styled, { css } from 'styled-components';
import {
  Container as BTContainer,
  Row as BTRow,
  Col as BTCol,
} from 'styled-bootstrap-grid';

import { MapBackgroundDarken } from '@/client/styles/maps';

export const Container = styled(BTContainer)`
  background-color: ${MapBackgroundDarken};
  height: 100vh;
`;

export const Row = styled(BTRow)`
  height: 100%;
  @media (min-width: 450px) {
    align-items: center;
  }
`;

interface StyledContainerProps {
  isRegister?: boolean;
}

export const Col = styled(BTCol)<StyledContainerProps>`
  ${props =>
    props.isRegister
      ? css`
          flex: 0 1 650px;
        `
      : css`
          flex: 0 1 450px;
        `}
`;
