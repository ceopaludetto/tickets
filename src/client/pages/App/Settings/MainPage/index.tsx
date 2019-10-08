import React from 'react';
// import { Row, Col } from 'styled-bootstrap-grid';
// import { Helmet } from 'react-helmet';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { Formik, Form } from 'formik';

// import { Button, IconButton, Switch } from '@/client/components/form';
// import { Divider, TextAlign, Alert } from '@/client/components/layout';
// import { SubTitle, List } from '@/client/components/typo';
// import {
//   FormikControl,
//   FormikCalendar,
//   FormikMaskedControl,
// } from '@/client/components/formik';
// import { useMultipleVisibility } from '@/client/utils';
// import { Profile, UpdateUsuario } from '@/client/graphql/usuario.gql';
// import {
//   UpdateInfoValidation,
//   UpdateSenhaValidation,
//   MutableTelefone,
// } from '@/client/providers/validations';

export default function MainSettingsPage() {
  // const { data } = useQuery<ProfileQuery>(Profile);
  // const { toggleVisibility, render: renderVisibility } = useMultipleVisibility<
  //   ('v' | 'nv' | 'rnv')[]
  // >(['v', 'nv', 'rnv']);

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
  //       initialValues={
  //         data &&
  //         data.profile && {
  //           email: data.profile.email,
  //           nome: data.profile.nome,
  //           sobrenome: data.profile.sobrenome,
  //           telefone: data.profile.telefone || '',
  //           nascimento: data.profile.nascimento || new Date(),
  //         }
  //       }
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

  return <div>mainapp</div>;
}
