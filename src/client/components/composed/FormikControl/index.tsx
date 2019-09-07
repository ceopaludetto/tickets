import React from 'react';
import { FieldProps } from 'formik';

import { Control, ControlProps } from '@/client/components/form';

export function FormikControl({
  field,
  form: { touched, errors },
  ...rest
}: FieldProps & ControlProps) {
  return (
    <Control
      {...field}
      {...rest}
      errors={
        touched[field.name] && errors[field.name]
          ? errors[field.name]
          : undefined
      }
    />
  );
}
