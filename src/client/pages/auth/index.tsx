import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { Theme } from '@/client/providers/theme';
import { Paper } from '@/client/components/layout';

const StyledContainer = styled(Container)`
  background-color: ${props => (props.theme as Theme).colors.primary.darken};
  height: 100vh;
`;

const StyledRow = styled(Row)`
  height: 100%;
  @media (min-width: 450px) {
    align-items: center;
  }
`;

const StyledCol = styled(Col)`
  flex: 0 1 450px;
`;

export default function Auth({ route }: RouteConfigComponentProps) {
  return (
    <StyledContainer fluid>
      <StyledRow justifyContent="center">
        <StyledCol>
          <Paper>{route && renderRoutes(route.routes)}</Paper>
        </StyledCol>
      </StyledRow>
    </StyledContainer>
  );
}
