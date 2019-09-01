import React, { useState } from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

import { Control, Button, IconButton } from '@/client/components/form';
import { Divider, TextAlign, Alert } from '@/client/components/layout';

export default function MainSettingsPage() {
  const [visibility, setVisibility] = useState({
    password: false,
    npassword: false,
    rnpassword: false,
  });

  function handleVisibility(prop: keyof typeof visibility) {
    return () =>
      setVisibility({
        ...visibility,
        [prop]: !visibility[prop],
      });
  }

  function renderEye(isOn: boolean) {
    return isOn ? <FiEyeOff /> : <FiEye />;
  }

  function returnType(isOn: boolean) {
    return isOn ? 'text' : 'password';
  }

  return (
    <>
      <Helmet title="Perfil" />
      <Control type="email" id="email" label="Email" />
      <Row alignItems="center">
        <Col col={12} md={6}>
          <Control type="text" id="name" label="Nome" />
        </Col>
        <Col col={12} md={6}>
          <Control type="text" id="lastName" label="Sobrenome" />
        </Col>
      </Row>
      <Row alignItems="center">
        <Col col={12} md={6}>
          <Control type="text" id="tel" label="Telefone" />
        </Col>
        <Col col={12} md={6}>
          <Control type="text" id="age" label="Data de Nascimento" />
        </Col>
      </Row>
      <TextAlign align="right">
        <Button>Salvar</Button>
      </TextAlign>
      <Divider />
      <Row>
        <Col col={12} md={6}>
          <Control
            type={returnType(visibility.password)}
            id="password"
            label="Senha atual"
            append={
              <IconButton onClick={handleVisibility('password')}>
                {renderEye(visibility.password)}
              </IconButton>
            }
          />
          <Control
            type={returnType(visibility.npassword)}
            id="npassword"
            label="Nova senha"
            append={
              <IconButton onClick={handleVisibility('npassword')}>
                {renderEye(visibility.npassword)}
              </IconButton>
            }
          />
          <Control
            type={returnType(visibility.rnpassword)}
            id="rnpassword"
            label="Repetir nova senha"
            append={
              <IconButton onClick={handleVisibility('rnpassword')}>
                {renderEye(visibility.rnpassword)}
              </IconButton>
            }
          />
          <TextAlign align="right">
            <Button>Alterar senha</Button>
          </TextAlign>
        </Col>
        <Col col={12} md={6}>
          <Alert>teste</Alert>
        </Col>
      </Row>
      <Divider />
      <TextAlign align="center">
        <Button color="error" variant="text">
          Excluir conta
        </Button>
      </TextAlign>
    </>
  );
}
