import React from 'react';
import { Row, Col } from 'styled-bootstrap-grid';
import { Helmet } from 'react-helmet';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Control, Button, IconButton } from '@/client/components/form';
import { Divider, TextAlign, Alert } from '@/client/components/layout';
import { SubTitle } from '@/client/components/typo';
import { FormikControl } from '@/client/components/composed';
import { useMultipleVisibility } from '@/client/utils/useVisibility';
import {
  ProfileQuery,
  UpdateUsuarioMutation,
  UpdateUsuarioMutationVariables,
} from '@/client/typescript/graphql';
import { Profile, UpdateUsuario } from '@/client/graphql/usuario.gql';
import { List } from './styles';

const UpdateUsuarioSchema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('Campo obrigatório'),
  nome: Yup.string().required('Campo obrigatório'),
  sobrenome: Yup.string().required('Campo obrigatório'),
});

export default function MainSettingsPage() {
  const { data } = useQuery<ProfileQuery>(Profile);
  const { toggleVisibility, render: renderVisibility } = useMultipleVisibility<
    ('v' | 'nv' | 'rnv')[]
  >(['v', 'nv', 'rnv']);

  const [fetchUpdate] = useMutation<
    UpdateUsuarioMutation,
    UpdateUsuarioMutationVariables
  >(UpdateUsuario, {
    update(cache, { data: result }) {
      if (result && result.updateUsuario) {
        cache.writeQuery({
          query: Profile,
          data: result,
        });
      }
    },
  });

  return (
    <>
      <Helmet title="Perfil" />
      <Formik
        validationSchema={UpdateUsuarioSchema}
        initialValues={
          data &&
          data.profile && {
            email: data.profile.email,
            nome: data.profile.nome,
            sobrenome: data.profile.sobrenome,
          }
        }
        onSubmit={async mutationData => {
          if (data && data.profile && mutationData) {
            await fetchUpdate({
              variables: {
                id: data.profile._id,
                input: mutationData,
              },
            });
          }
        }}
      >
        {() => (
          <Form>
            <Field
              name="email"
              component={FormikControl}
              type="email"
              id="email"
              label="Email"
            />
            <Row alignItems="center">
              <Col col={12} md={6}>
                <Field
                  name="nome"
                  component={FormikControl}
                  type="text"
                  id="nome"
                  label="Nome"
                />
              </Col>
              <Col col={12} md={6}>
                <Field
                  name="sobrenome"
                  component={FormikControl}
                  type="text"
                  id="sobrenome"
                  label="Sobrenome"
                />
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
              <Button type="submit">Salvar</Button>
            </TextAlign>
          </Form>
        )}
      </Formik>
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
            <SubTitle>Dicas de senha</SubTitle>
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
