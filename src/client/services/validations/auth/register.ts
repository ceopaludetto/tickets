import * as Yup from 'yup';

import { REQUIRED, EMAIL, PHONE, PASSWORD, DATE, CNPJ, CEP, SITE } from '../constants';

export const RegisterValidationSchema = Yup.object().shape({
  nome: Yup.string().required(REQUIRED),
  sobrenome: Yup.string().required(REQUIRED),
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
  telefone: Yup.string().matches(/\((\d){2}\) \d?(\d){4}-(\d){4}/, PHONE),
  dataNascimento: Yup.date()
    .typeError(DATE)
    .required(REQUIRED),
  senha: Yup.string().required(REQUIRED),
  rsenha: Yup.string()
    .oneOf([Yup.ref('senha')], PASSWORD)
    .required(REQUIRED),
  hasEmpresa: Yup.boolean(),
  cnpj: Yup.string()
    .matches(/(\d){3}\.(\d){3}\.(\d){3}\/(\d){4}-(\d){2}/, CNPJ)
    .when('hasEmpresa', {
      is: (hasEmpresa: boolean) => hasEmpresa,
      then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
      otherwise: (schema: Yup.StringSchema) => schema,
    }),
  razaoSocial: Yup.string().when('hasEmpresa', {
    is: (hasEmpresa: boolean) => hasEmpresa,
    then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
    otherwise: (schema: Yup.StringSchema) => schema,
  }),
  nomeFantasia: Yup.string().when('hasEmpresa', {
    is: (hasEmpresa: boolean) => hasEmpresa,
    then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
    otherwise: (schema: Yup.StringSchema) => schema,
  }),
  empresaTelefone: Yup.string()
    .matches(/\((\d){2}\) \d?(\d){4}-(\d){4}/, PHONE)
    .when('hasEmpresa', {
      is: (hasEmpresa: boolean) => hasEmpresa,
      then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
      otherwise: (schema: Yup.StringSchema) => schema,
    }),
  empresaEmail: Yup.string()
    .email(EMAIL)
    .when('hasEmpresa', {
      is: (hasEmpresa: boolean) => hasEmpresa,
      then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
      otherwise: (schema: Yup.StringSchema) => schema,
    }),
  site: Yup.string().url(SITE),
  cep: Yup.string()
    .matches(/(\d){5}-(\d){3}/, CEP)
    .when('hasEmpresa', {
      is: (hasEmpresa: boolean) => hasEmpresa,
      then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
      otherwise: (schema: Yup.StringSchema) => schema,
    }),
  endereco: Yup.string().when('hasEmpresa', {
    is: (hasEmpresa: boolean) => hasEmpresa,
    then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
    otherwise: (schema: Yup.StringSchema) => schema,
  }),
  numero: Yup.string().when('hasEmpresa', {
    is: (hasEmpresa: boolean) => hasEmpresa,
    then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
    otherwise: (schema: Yup.StringSchema) => schema,
  }),
});
