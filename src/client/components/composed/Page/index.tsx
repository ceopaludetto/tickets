import React from 'react';
import { Col } from 'styled-bootstrap-grid';

import { Title, SubTitle } from '@/client/components/typo';
import { Container, Header } from './styles';

interface PageProps {
  title: string;
  subTitle: string;
  children?: React.ReactNode | React.ReactNodeArray;
}

export function Page({ children, title, subTitle }: PageProps) {
  return (
    <Container>
      <Header>
        <Col>
          <SubTitle>{subTitle}</SubTitle>
          <Title hasMargin={false}>{title}</Title>
        </Col>
      </Header>
      {children}
    </Container>
  );
}
