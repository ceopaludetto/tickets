import * as Yup from 'yup';

import { REQUIRED, EMAIL, PHONE, PASSWORD } from '../constants';

export const RegisterValidationSchema = Yup.object().shape({
  nome: Yup.string().required(REQUIRED),
  sobrenome: Yup.string().required(REQUIRED),
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
  telefone: Yup.string().matches(/\((\d){2}\) \d?(\d){4}-(\d){4}/, PHONE),
  senha: Yup.string().required(REQUIRED),
  rsenha: Yup.string()
    .oneOf([Yup.ref('senha'), null], PASSWORD)
    .required(REQUIRED),
});
