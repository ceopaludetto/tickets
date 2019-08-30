import React from 'react';
import { Col } from 'styled-bootstrap-grid';
import { HelmetProps, Helmet } from 'react-helmet';

import { Title, SubTitle } from '@/client/components/typo';
import { Container, Header, Footer } from './styles';

interface PageProps {
  title: string;
  subTitle: string;
  children?: React.ReactNode | React.ReactNodeArray;
  helmetProps?: HelmetProps;
  helmetChildren?: React.ReactNode | React.ReactNodeArray;
  notFluid?: boolean;
  footer?: React.ReactNode | React.ReactNodeArray;
}

export function Page({
  children,
  title,
  subTitle,
  helmetProps,
  helmetChildren,
  notFluid = false,
  footer,
}: PageProps) {
  return (
    <>
      <Helmet {...helmetProps}>{helmetChildren}</Helmet>
      <Container fluid={!notFluid}>
        <>
          <Header hasFooter={!!footer}>
            <Col>
              <SubTitle>{subTitle}</SubTitle>
              <Title hasMargin={false}>{title}</Title>
            </Col>
          </Header>
          {footer && <Footer>{footer}</Footer>}
          <>{children}</>
        </>
      </Container>
    </>
  );
}
