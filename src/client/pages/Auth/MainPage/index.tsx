import React, { useEffect, useState } from 'react';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';

import { Paper } from '@/client/components/layout';
import { useRouter } from '@/client/utils/useRouter';
import { Container, Row, Col } from './styles';

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
    <Container fluid>
      <Row justifyContent="center">
        <Col isRegister={isRegister}>
          <Paper isElevated={false}>
            {route && renderRoutes(route.routes)}
          </Paper>
        </Col>
      </Row>
    </Container>
  );
}
