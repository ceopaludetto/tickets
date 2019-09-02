import React from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import { Helmet } from 'react-helmet';

import { Control, Button, IconButton } from '@/client/components/form';
import { Divider, TextAlign, Alert } from '@/client/components/layout';
import { useMultipleVisibility } from '@/client/utils/useVisibility';
import { List } from './styles';

export default function MainSettingsPage() {
  const { toggleVisibility, render: renderVisibility } = useMultipleVisibility<
    ('v' | 'nv' | 'rnv')[]
  >(['v', 'nv', 'rnv']);

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
            type={renderVisibility('v', 'text', 'password')}
            id="password"
            label="Senha atual"
            append={
              <IconButton onClick={toggleVisibility('v')}>
                {renderVisibility('v')}
              </IconButton>
            }
          />
          <Control
            type={renderVisibility('nv', 'text', 'password')}
            id="npassword"
            label="Nova senha"
            append={
              <IconButton onClick={toggleVisibility('nv')}>
                {renderVisibility('nv')}
              </IconButton>
            }
          />
          <Control
            type={renderVisibility('rnv', 'text', 'password')}
            id="rnpassword"
            label="Repetir nova senha"
            append={
              <IconButton onClick={toggleVisibility('rnv')}>
                {renderVisibility('rnv')}
              </IconButton>
            }
          />
          <TextAlign align="right">
            <Button>Alterar senha</Button>
          </TextAlign>
        </Col>
        <Col col={12} md={6}>
          <Alert>
            <h4>Dicas de senha:</h4>
            <List>
              <li>Pelo menos oito caracteres</li>
              <li>Pelo menos um caractere especial</li>
              <li>Pelo menos uma letra maiúscula</li>
            </List>
          </Alert>
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
