import * as Yup from 'yup';

import { REQUIRED, EMAIL } from '../constants';

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
  senha: Yup.string().required(REQUIRED),
});
