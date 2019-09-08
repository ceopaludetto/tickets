import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Container } from 'styled-bootstrap-grid';

import { Control, Button } from '@/client/components/form';
import { TextAlign, Step } from '@/client/components/layout';
import { Title, SubTitle } from '@/client/components/typo';
import { Col, MaxWidth } from './styles';

export default function Register() {
  const [currentPage, setPage] = useState(1);

  function getStatus(n: number): 'active' | 'done' | 'undone' {
    if (currentPage === n) {
      return 'active';
    }

    if (currentPage > n) {
      return 'done';
    }

    return 'undone';
  }

  function handleNext() {
    setPage(currentPage + 1);
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <Container fluid>
        <Row alignItems="center">
          <MaxWidth>
            <Step inverted status={getStatus(1)} content="Usuário" />
            <Step inverted status={getStatus(2)} content="Senha" />
            <Step inverted status={getStatus(3)} last content="Empresa" />
          </MaxWidth>
          <Col>
            <SubTitle>Criação de Usuário</SubTitle>
            <Title>Nova conta</Title>
            <Control label="Nome" id="name" />
            <Control label="Sobrenome" id="lastname" />
            <Control label="Email" id="email" />
            <TextAlign align="right">
              <Button onClick={handleNext}>Próximo</Button>
            </TextAlign>
          </Col>
        </Row>
      </Container>
    </>
  );
}
