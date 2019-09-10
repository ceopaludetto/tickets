import * as Yup from 'yup';

import {
  REQUIRED,
  EMAIL,
  MIN,
  CONFIRM_SENHA,
  UPPERCASE,
  SPECIAL_CHARACTER,
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
  senha: Yup.string()
    .required(REQUIRED)
    .min(8, MIN)
    .matches(/(?=.*[A-Z])/, UPPERCASE)
    .matches(/(?=.*\W)/, SPECIAL_CHARACTER),
  rsenha: Yup.string()
    .oneOf([Yup.ref('senha'), null], CONFIRM_SENHA)
    .required(REQUIRED),
});
