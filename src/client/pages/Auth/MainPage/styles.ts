import styled, { css } from 'styled-components';
import {
  Container as BTContainer,
  Row as BTRow,
  Col as BTCol,
} from 'styled-bootstrap-grid';

import { Theme } from '@/client/providers/theme';
import { MapBackgroundDarken } from '@/client/styles/maps';

interface StyledContainerProps {
  isRegister?: boolean;
}

export const Container = styled(BTContainer)<StyledContainerProps>`
  transition: background-color 125ms ease-in-out;
  background-color: ${props =>
    props.isRegister
      ? MapBackgroundDarken
      : (props.theme as Theme).colors.primary.darken};
  height: 100vh;
`;

export const Row = styled(BTRow)`
  height: 100%;
  @media (min-width: 450px) {
    align-items: center;
  }
`;

export const Col = styled(BTCol)<StyledContainerProps>`
  transition: flex 125ms ease-in-out;
  ${props =>
    props.isRegister
      ? css`
          flex: 0 1 650px;
        `
      : css`
          flex: 0 1 450px;
        `}
`;
