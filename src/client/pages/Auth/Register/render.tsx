import React from 'react';
import { Row, Col } from 'styled-bootstrap-grid';

import { Alert } from '@/client/components/layout';
import { FormikCheckbox, FormikControl } from '@/client/components/composed';
import { IconButton } from '@/client/components/form';
import { SubTitle, List } from '@/client/components/typo';

interface RenderOpts<T extends string[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderVisibility: (p: T[number], tru?: any, fals?: any) => any;
  toggleVisibility: (p: T[number]) => () => void;
}

export function renderForm(
  page: number,
  hasEmpresa: boolean,
  { renderVisibility, toggleVisibility }: RenderOpts<('senha' | 'rsenha')[]>
) {
  if (page === 0) {
    return (
      <>
        <Row>
          <Col col={12} md>
            <FormikControl required name="nome" label="Nome" id="name" />
          </Col>
          <Col col={12} md>
            <FormikControl
              name="sobrenome"
              label="Sobrenome"
              id="lastname"
              required
            />
          </Col>
        </Row>
        <FormikControl name="email" label="Email" id="email" required />
        <Row>
          <Col col={12} md>
            <FormikControl name="telefone" label="Telefone" id="telefone" />
          </Col>
          <Col col={12} md>
            <FormikControl
              name="nascimento"
              label="Nascimento"
              id="nascimento"
              required
            />
          </Col>
        </Row>
      </>
    );
  }

  if (page === 1) {
    return (
      <>
        <Row>
          <Col col={12} md>
            <FormikControl
              type={renderVisibility('senha', 'text', 'password')}
              name="senha"
              label="Senha"
              id="senha"
              required
              append={
                <IconButton
                  type="button"
                  aria-label={renderVisibility(
                    'rsenha',
                    'Ocultar campo "senha"',
                    'Mostrar campo "senha"'
                  )}
                  onClick={toggleVisibility('senha')}
                >
                  {renderVisibility('senha')}
                </IconButton>
              }
            />
            <FormikControl
              type={renderVisibility('rsenha', 'text', 'password')}
              name="rsenha"
              label="Repetir senha"
              id="rsenha"
              required
              append={
                <IconButton
                  type="button"
                  aria-label={renderVisibility(
                    'rsenha',
                    'Ocultar campo "repetir senha"',
                    'Mostrar campo "repetir senha"'
                  )}
                  onClick={toggleVisibility('rsenha')}
                >
                  {renderVisibility('rsenha')}
                </IconButton>
              }
            />
          </Col>
          <Col col={12} order="first" mdOrder="last" md>
            <Alert>
              <SubTitle>Dicas de senha</SubTitle>
              <List>
                <li>Pelo menos oito caracteres</li>
                <li>Pelo menos um caractere especial</li>
                <li>Pelo menos uma letra maiúscula</li>
              </List>
            </Alert>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <FormikCheckbox
        id="hasEmpresa"
        label="Criar empresa?"
        name="hasEmpresa"
        checked={hasEmpresa}
      />
      <Row>
        <Col col={12} md>
          <FormikControl
            name="cnpj"
            label="CNPJ"
            id="cnpj"
            required={hasEmpresa}
          />
        </Col>
        <Col col={12} md>
          <FormikControl
            name="razaoSocial"
            label="Razão Social"
            id="razaoSocial"
            required={hasEmpresa}
          />
        </Col>
      </Row>
      <Row>
        <Col col={12} md>
          <FormikControl
            name="nomeFantasia"
            label="Nome Fantasia"
            id="nomeFantasia"
            required={hasEmpresa}
          />
        </Col>
        <Col col={12} md>
          <FormikControl
            name="nomeCompleto"
            label="Nome Completo"
            id="nomeCompleto"
          />
        </Col>
      </Row>
      <Row>
        <Col col={12} md>
          <FormikControl name="site" label="Site" id="site" />
        </Col>
        <Col col={12} md>
          <FormikControl
            name="empresaEmail"
            label="Email"
            id="empresaEmail"
            required={hasEmpresa}
          />
        </Col>
      </Row>
      <Row>
        <Col col={12} md>
          <FormikControl
            name="endereco"
            label="Endereço"
            id="endereco"
            required={hasEmpresa}
          />
        </Col>
        <Col col={12} md>
          <FormikControl
            name="cep"
            label="CEP"
            id="cep"
            required={hasEmpresa}
          />
        </Col>
      </Row>
    </>
  );
}
