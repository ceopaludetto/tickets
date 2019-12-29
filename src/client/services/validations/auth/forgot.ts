import * as Yup from 'yup';

import { REQUIRED, EMAIL } from '../constants';

export const ForgotValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
});
