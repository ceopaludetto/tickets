import * as Yup from 'yup';

import {
  REQUIRED,
  EMAIL,
  MIN,
  CONFIRM_SENHA,
  UPPERCASE,
  SPECIAL_CHARACTER,
  SITE,
} from './constants';

export const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .required(REQUIRED)
    .email(EMAIL),
  senha: Yup.string().required(REQUIRED),
});

export const RegisterValidation = Yup.object().shape({
  nome: Yup.string()
    .required(REQUIRED)
    .min(8, MIN),
  sobrenome: Yup.string()
    .required(REQUIRED)
    .min(8, MIN),
  email: Yup.string()
    .required(REQUIRED)
    .email(EMAIL),
  telefone: Yup.string().matches(
    /\([0-9]{2}\) 9?[1-9]{4}-[1-9]{4}/,
    'Telefone inválido'
  ),
  nascimento: Yup.date().required(REQUIRED),
  senha: Yup.string()
    .required(REQUIRED)
    .min(8, MIN)
    .matches(/(?=.*[A-Z])/, UPPERCASE)
    .matches(/(?=.*\W)/, SPECIAL_CHARACTER),
  rsenha: Yup.string()
    .oneOf([Yup.ref('senha'), null], CONFIRM_SENHA)
    .required(REQUIRED),
  hasEmpresa: Yup.boolean().required(REQUIRED),
  cnpj: Yup.string().when(
    'hasEmpresa',
    (hasEmpresa: boolean, schema: Yup.StringSchema) =>
      hasEmpresa
        ? schema
            .matches(
              /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/,
              'CNPJ inválido'
            )
            .required(REQUIRED)
        : schema
  ),
  nomeFantasia: Yup.string().when(
    'hasEmpresa',
    (hasEmpresa: boolean, schema: Yup.StringSchema) =>
      hasEmpresa ? schema.required(REQUIRED) : schema
  ),
  nomeCompleto: Yup.string().when(
    'hasEmpresa',
    (hasEmpresa: boolean, schema: Yup.StringSchema) =>
      hasEmpresa ? schema.required(REQUIRED) : schema
  ),
  razaoSocial: Yup.string().when(
    'hasEmpresa',
    (hasEmpresa: boolean, schema: Yup.StringSchema) =>
      hasEmpresa ? schema.required(REQUIRED) : schema
  ),
  site: Yup.string().when(
    'hasEmpresa',
    (hasEmpresa: boolean, schema: Yup.StringSchema) =>
      hasEmpresa ? schema.url(SITE) : schema
  ),
  empresaEmail: Yup.string().when(
    'hasEmpresa',
    (hasEmpresa: boolean, schema: Yup.StringSchema) =>
      hasEmpresa ? schema.email(EMAIL).required(REQUIRED) : schema
  ),
  endereco: Yup.string().when(
    'hasEmpresa',
    (hasEmpresa: boolean, schema: Yup.StringSchema) =>
      hasEmpresa ? schema.required(REQUIRED) : schema
  ),
  cep: Yup.string().when(
    'hasEmpresa',
    (hasEmpresa: boolean, schema: Yup.StringSchema) =>
      hasEmpresa
        ? schema
            .matches(/[0-9]{5}-[0-9]{3}/, 'Insira um CEP válido')
            .required(REQUIRED)
        : schema
  ),
});
