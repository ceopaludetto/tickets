import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import { Theme } from '@/client/providers/theme';
import { Paper } from '@/client/components/layout';
import { useRouter } from '@/client/utils/useRouter';
import { MapBackgroundDarken } from '@/client/styles/utils';

interface StyledContainerProps {
  isRegister?: boolean;
}

const StyledContainer = styled(Container)<StyledContainerProps>`
  transition: background-color 125ms ease-in-out;
  background-color: ${props =>
    props.isRegister
      ? MapBackgroundDarken
      : (props.theme as Theme).colors.primary.darken};
  height: 100vh;
`;

const StyledRow = styled(Row)`
  height: 100%;
  @media (min-width: 450px) {
    align-items: center;
  }
`;

const StyledCol = styled(Col)<StyledContainerProps>`
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

export default function Auth({ route }: RouteConfigComponentProps) {
  const { location } = useRouter();
  const [isRegister, setIsRegister] = useState();

  useEffect(() => {
    if (location.pathname.includes('/auth/register')) {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  }, [location.pathname]);

  return (
    <StyledContainer isRegister={isRegister} fluid>
      <StyledRow justifyContent="center">
        <StyledCol isRegister={isRegister}>
          <Paper isElevated={!isRegister}>
            {route && renderRoutes(route.routes)}
          </Paper>
        </StyledCol>
      </StyledRow>
    </StyledContainer>
  );
}
