import * as Yup from 'yup';

import { REQUIRED, EMAIL, TELEFONE } from '../constants';

export const RegisterValidationSchema = Yup.object().shape({
  nome: Yup.string().required(REQUIRED),
  sobrenome: Yup.string().required(REQUIRED),
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
  telefone: Yup.string().matches(/\((\d){2}\) \d?(\d){4}-(\d){4}/, TELEFONE),
  senha: Yup.string().required(REQUIRED),
  rsenha: Yup.string().required(REQUIRED),
});
