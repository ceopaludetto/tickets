import React from 'react';
import { Col } from 'styled-bootstrap-grid';
import { HelmetProps, Helmet } from 'react-helmet';

import { Title, SubTitle } from '@/client/components/typo';
import { Divider } from '@/client/components/layout';
import { Container, Header, Footer, Append } from './styles';

interface PageProps {
  title: string;
  subTitle: string;
  children?: React.ReactNode | React.ReactNodeArray;
  helmetProps?: HelmetProps;
  helmetChildren?: React.ReactNode | React.ReactNodeArray;
  notFluid?: boolean;
  footer?: React.ReactNode | React.ReactNodeArray;
  append?: React.ReactNode | React.ReactNodeArray;
}

export function Page({
  children,
  title,
  subTitle,
  helmetProps,
  helmetChildren,
  notFluid = false,
  footer,
  append,
}: PageProps) {
  return (
    <>
      <Helmet {...helmetProps}>{helmetChildren}</Helmet>
      <Container fluid={!notFluid}>
        <>
          <Header alignItems="center" hasFooter={!!footer}>
            <Col col>
              <SubTitle>{subTitle}</SubTitle>
              <Title hasMargin={false}>{title}</Title>
            </Col>
            {append && <Append>{append}</Append>}
          </Header>
          {!footer && <Divider />}
          {footer && <Footer>{footer}</Footer>}
          <>{children}</>
        </>
      </Container>
    </>
  );
}
