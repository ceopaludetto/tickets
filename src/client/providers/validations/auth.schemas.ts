import * as Yup from 'yup';

import {
  REQUIRED,
  EMAIL,
  MIN,
  CONFIRM_SENHA,
  UPPERCASE,
  SPECIAL_CHARACTER,
  SITE,
  TELEFONE,
  DATE,
  CEP,
  CNPJ,
} from './constants';

export const LoginValidation = Yup.object().shape({
  email: Yup.string().required(REQUIRED),
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
  telefone: Yup.string().matches(/\([0-9]{2}\) 9?[1-9]{4}-[1-9]{4}/, TELEFONE),
  nascimento: Yup.date()
    .max(new Date(), DATE)
    .typeError(DATE)
    .required(REQUIRED),
  senha: Yup.string()
    .required(REQUIRED)
    .min(8, MIN)
    .matches(/(?=.*[A-Z])/, UPPERCASE)
    .matches(/(?=.*\W)/, SPECIAL_CHARACTER),
  rsenha: Yup.string()
    .oneOf([Yup.ref('senha'), null], CONFIRM_SENHA)
    .required(REQUIRED),
  hasEmpresa: Yup.boolean().required(REQUIRED),
  cnpj: Yup.string().when('hasEmpresa', {
    is: true,
    then: (schema: Yup.StringSchema) => schema.cnpj(CNPJ).required(REQUIRED),
  }),
  nomeFantasia: Yup.string().when('hasEmpresa', {
    is: true,
    then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
  }),
  nomeCompleto: Yup.string(),
  empresaTelefone: Yup.string().when('hasEmpresa', {
    is: true,
    then: (schema: Yup.StringSchema) => schema.matches(/\([0-9]{2}\) [0-9]{4}-[0-9]/, TELEFONE).required(REQUIRED),
  }),
  razaoSocial: Yup.string().when('hasEmpresa', {
    is: true,
    then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
  }),
  site: Yup.string().when('hasEmpresa', {
    is: true,
    then: (schema: Yup.StringSchema) => schema.url(SITE),
  }),
  empresaEmail: Yup.string().when('hasEmpresa', {
    is: true,
    then: (schema: Yup.StringSchema) => schema.email(EMAIL).required(REQUIRED),
  }),
  endereco: Yup.string().when('hasEmpresa', {
    is: true,
    then: (schema: Yup.StringSchema) => schema.required(REQUIRED),
  }),
  cep: Yup.string().when('hasEmpresa', {
    is: true,
    then: (schema: Yup.StringSchema) => schema.matches(/[0-9]{5}-[0-9]{3}/, CEP).required(REQUIRED),
  }),
});
