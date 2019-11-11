import React from 'react';
import { Formik, Form } from 'formik';
import {
  Button,
  Divider,
  FormControlLabel,
  Switch,
  FormLabel,
  Paper,
  Typography,
  IconButton,
} from '@material-ui/core';
import { TodayOutlined } from '@material-ui/icons';
import { useQuery /* useMutation */ } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import clsx from 'clsx';

import { useStyles } from './styles';
import { useMultipleVisibility } from '@/client/utils';
import { FormikField, FormikDatePicker } from '@/client/components/composed';
import { Profile /* UpdateUsuario */ } from '@/client/graphql/usuario.gql';
import {
  UpdateInfoValidation,
  UpdateSenhaValidation,
} from '@/client/providers/validations';

export default function MainSettingsPage() {
  const classes = useStyles();

  const { data } = useQuery<ProfileQuery>(Profile);
  const { toggleVisibility, renderVisibility } = useMultipleVisibility<
    ('p' | 'np' | 'rnp')[]
  >(['p', 'np', 'rnp']);

  // const [fetchUpdate] = useMutation<
  //   UpdateUsuarioMutation,
  //   UpdateUsuarioMutationVariables
  // >(UpdateUsuario, {
  //   update(cache, { data: result }) {
  //     if (result && result.updateUsuario) {
  //       cache.writeQuery<ProfileQuery>({
  //         query: Profile,
  //         data: {
  //           profile: result.updateUsuario,
  //         },
  //       });
  //     }
  //   },
  // });

  // return (
  //   <>
  //     <Helmet title="Perfil" />
  //     <Formik
  //       validationSchema={UpdateInfoValidation}
  // initialValues={
  //   data &&
  //   data.profile && {
  //     email: data.profile.email,
  //     nome: data.profile.nome,
  //     sobrenome: data.profile.sobrenome,
  //     telefone: data.profile.telefone || '',
  //     nascimento: data.profile.nascimento || new Date(),
  //   }
  // }
  //       onSubmit={async mutationData => {
  //         if (data && data.profile && mutationData) {
  //           await fetchUpdate({
  //             variables: {
  //               id: data.profile._id,
  //               input: mutationData,
  //             },
  //           });
  //         }
  //       }}
  //     >
  //       {({ setFieldValue, setFieldTouched }) => (
  //         <Form>
  //           <FormikControl name="email" type="email" id="email" label="Email" />
  //           <Row alignItems="center">
  //             <Col col={12} md={6}>
  //               <FormikControl name="nome" type="text" id="nome" label="Nome" />
  //             </Col>
  //             <Col col={12} md={6}>
  //               <FormikControl
  //                 name="sobrenome"
  //                 type="text"
  //                 id="sobrenome"
  //                 label="Sobrenome"
  //               />
  //             </Col>
  //           </Row>
  //           <Row alignItems="center">
  //             <Col col={12} md={6}>
  //               <FormikMaskedControl
  //                 type="text"
  //                 id="telefone"
  //                 label="Telefone"
  //                 name="telefone"
  //                 guide={false}
  //                 mask={MutableTelefone}
  //               />
  //             </Col>
  //             <Col col={12} md={6}>
  //               <FormikCalendar
  //                 type="text"
  //                 id="nascimento"
  //                 label="Data de Nascimento"
  //                 name="nascimento"
  //                 initialValue={data && data.profile.nascimento}
  //                 setFieldValue={setFieldValue}
  //                 setFieldTouched={setFieldTouched}
  //               />
  //             </Col>
  //           </Row>
  //           <TextAlign align="right">
  //             <Button type="submit">Salvar</Button>
  //           </TextAlign>
  //         </Form>
  //       )}
  //     </Formik>
  //     <Divider />
  //     <Switch
  //       id="public"
  //       label="Perfi público"
  //       content="Ao ativar seu perfil ficará visível a todos"
  //     />
  //     <Divider />
  //     <Row>
  //       <Col col={12} md={6}>
  //         <Formik
  //           validationSchema={UpdateSenhaValidation}
  //           initialValues={{
  //             senha: '',
  //             nsenha: '',
  //             rsenha: '',
  //           }}
  //           onSubmit={() => {}}
  //         >
  //           {() => (
  //             <Form>
  //               <FormikControl
  //                 name="senha"
  //                 id="senha"
  //                 label="Senha atual"
  //                 type={renderVisibility('v', 'text', 'password')}
  //                 append={
  //                   <IconButton
  //                     type="button"
  //                     aria-label={renderVisibility(
  //                       'rnv',
  //                       'Ocultar campo "senha atual"',
  //                       'Mostrar campo "senha atual"'
  //                     )}
  //                     onClick={toggleVisibility('v')}
  //                   >
  //                     {renderVisibility('v')}
  //                   </IconButton>
  //                 }
  //               />
  //               <FormikControl
  //                 name="nsenha"
  //                 id="nsenha"
  //                 label="Nova senha"
  //                 type={renderVisibility('nv', 'text', 'password')}
  //                 append={
  //                   <IconButton
  //                     type="button"
  //                     aria-label={renderVisibility(
  //                       'rnv',
  //                       'Ocultar campo "nova senha"',
  //                       'Mostrar campo "nova senha"'
  //                     )}
  //                     onClick={toggleVisibility('nv')}
  //                   >
  //                     {renderVisibility('nv')}
  //                   </IconButton>
  //                 }
  //               />
  //               <FormikControl
  //                 name="rsenha"
  //                 id="rsenha"
  //                 label="Repetir nova senha"
  //                 type={renderVisibility('rnv', 'text', 'password')}
  //                 append={
  //                   <IconButton
  //                     type="button"
  //                     aria-label={renderVisibility(
  //                       'rnv',
  //                       'Ocultar campo "repetir nova senha"',
  //                       'Mostrar campo "repetir nova senha"'
  //                     )}
  //                     onClick={toggleVisibility('rnv')}
  //                   >
  //                     {renderVisibility('rnv')}
  //                   </IconButton>
  //                 }
  //               />
  //               <TextAlign align="right">
  //                 <Button type="submit">Alterar senha</Button>
  //               </TextAlign>
  //             </Form>
  //           )}
  //         </Formik>
  //       </Col>
  //       <Col col={12} md={6} order="first" mdOrder="last">
  //         <Alert>
  //           <SubTitle>Dicas de senha</SubTitle>
  //           <List>
  //             <li>Pelo menos oito caracteres</li>
  //             <li>Pelo menos um caractere especial</li>
  //             <li>Pelo menos uma letra maiúscula</li>
  //           </List>
  //         </Alert>
  //       </Col>
  //     </Row>
  //     <Divider />
  //     <TextAlign align="center">
  //       <Button hasMargin color="error" variant="text">
  //         Excluir conta
  //       </Button>
  //     </TextAlign>
  //   </>
  // );

  return (
    <>
      <Helmet title="Perfil" />
      <Formik
        validationSchema={UpdateInfoValidation}
        initialValues={
          data &&
          data.profile && {
            email: data.profile.email,
            nome: data.profile.nome,
            sobrenome: data.profile.sobrenome,
            telefone: data.profile.telefone || '',
            nascimento: data.profile.nascimento || new Date(),
          }
        }
        onSubmit={() => {}}
      >
        {() => (
          <Form>
            <div className={classes.fieldGroup}>
              <div className={classes.field}>
                <FormikField name="nome" label="Nome" id="nome" />
              </div>
              <div className={classes.field}>
                <FormikField
                  name="sobrenome"
                  label="Sobrenome"
                  id="sobrenome"
                />
              </div>
            </div>
            <FormikField name="email" label="Email" id="email" />
            <div className={classes.fieldGroup}>
              <div className={classes.field}>
                <FormikField name="telefone" label="Telefone" id="telefone" />
              </div>
              <div className={classes.field}>
                <FormikDatePicker
                  disableFuture
                  keyboardIcon={<TodayOutlined />}
                  okLabel="OK"
                  cancelLabel="Cancelar"
                  format="dd/MM/yyyy"
                  label="Data de Nascimento"
                  id="nascimento"
                  name="nascimento"
                  invalidDateMessage="Data inválida"
                />
              </div>
            </div>
            <div className={classes.alignRight}>
              <Button variant="contained" color="primary">
                Salvar
              </Button>
            </div>
            <Divider className={classes.divider} />
            <FormLabel htmlFor="public-profile" component="label">
              Perfil público
            </FormLabel>
            <br />
            <FormControlLabel
              label="Ao ativar sua conta fica visível a todos usuários"
              control={<Switch id="public-profile" />}
            />
            <Divider className={classes.divider} />
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={{
          senha: '',
          nsenha: '',
          rnsenha: '',
        }}
        validationSchema={UpdateSenhaValidation}
        onSubmit={() => {}}
      >
        {() => (
          <Form>
            <div className={classes.fieldGroup}>
              <div className={classes.field}>
                <FormikField
                  name="senha"
                  label="Senha"
                  id="senha"
                  type={renderVisibility('p', 'text', 'password')}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label={renderVisibility(
                          'p',
                          'Esconder Confirmar Senha',
                          'Ver Confirmar Senha'
                        )}
                        type="button"
                        onClick={toggleVisibility('p')}
                      >
                        {renderVisibility('p')}
                      </IconButton>
                    ),
                  }}
                />
                <FormikField
                  name="nsenha"
                  label="Nova senha"
                  id="nsenha"
                  type={renderVisibility('np', 'text', 'password')}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label={renderVisibility(
                          'np',
                          'Esconder Confirmar Senha',
                          'Ver Confirmar Senha'
                        )}
                        type="button"
                        onClick={toggleVisibility('np')}
                      >
                        {renderVisibility('np')}
                      </IconButton>
                    ),
                  }}
                />
                <FormikField
                  name="rnsenha"
                  label="Repetir nova senha"
                  id="rnsenha"
                  type={renderVisibility('rnp', 'text', 'password')}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label={renderVisibility(
                          'rnp',
                          'Esconder Confirmar Senha',
                          'Ver Confirmar Senha'
                        )}
                        type="button"
                        onClick={toggleVisibility('rnp')}
                      >
                        {renderVisibility('rnp')}
                      </IconButton>
                    ),
                  }}
                />
                <div className={classes.alignRight}>
                  <Button variant="contained" color="primary">
                    Alterar
                  </Button>
                </div>
              </div>
              <div className={clsx(classes.field, classes.paperOrder)}>
                <Paper elevation={0} className={classes.paper}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    color="secondary"
                  >
                    Dicas de senha
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    No mínimo 8 caracteres;
                    <br />
                    Pelo menos 1 caractere especial;
                    <br />
                    Pelo menos 1 caractere maiúsculo.
                  </Typography>
                </Paper>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Divider className={classes.divider} />
      <div className={classes.alignCenter}>
        <Button variant="text">Excluir conta</Button>
      </div>
    </>
  );
}
