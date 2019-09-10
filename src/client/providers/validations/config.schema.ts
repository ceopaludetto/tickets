import * as Yup from 'yup';

import {
  REQUIRED,
  MIN,
  EMAIL,
  CONFIRM_SENHA,
  NOT_CONFIRM_SENHA,
  UPPERCASE,
  SPECIAL_CHARACTER,
} from './constants';

export const UpdateInfoValidation = Yup.object().shape({
  nome: Yup.string()
    .required(REQUIRED)
    .min(8, MIN),
  sobrenome: Yup.string()
    .required(REQUIRED)
    .min(8, MIN),
  email: Yup.string()
    .required(REQUIRED)
    .email(EMAIL),
});

export const UpdateSenhaValidation = Yup.object().shape({
  senha: Yup.string().required(REQUIRED),
  nsenha: Yup.string()
    .min(8, MIN)
    .matches(/(?=.*[A-Z])/, UPPERCASE)
    .matches(/(?=.*\W)/, SPECIAL_CHARACTER)
    .notOneOf([Yup.ref('senha'), null], NOT_CONFIRM_SENHA)
    .required(REQUIRED),
  rsenha: Yup.string()
    .oneOf([Yup.ref('nsenha'), null], CONFIRM_SENHA)
    .required(REQUIRED),
});
