import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { Theme } from '@/client/providers/theme';

const StyledContainer = styled(Container)`
  border-top: 3px solid ${props => (props.theme as Theme).colors.primary.main};
  height: 100vh;
`;

const StyledRow = styled(Row)`
  height: 100%;
  @media (min-width: 500px) {
    align-items: center;
  }
`;

const StyledCol = styled(Col)`
  max-width: 500px;
`;

export default function Auth({ route }: RouteConfigComponentProps) {
  return (
    <StyledContainer fluid>
      <StyledRow justifyContent="center">
        <StyledCol>{route && renderRoutes(route.routes)}</StyledCol>
      </StyledRow>
    </StyledContainer>
  );
}
