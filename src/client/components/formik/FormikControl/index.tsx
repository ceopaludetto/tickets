import React from 'react';
import { FieldProps, Field } from 'formik';

import { Control, ControlProps } from '@/client/components/form';

export function FormikControl({ name, ...rest }: ControlProps) {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors } }: FieldProps) => (
        <Control
          {...field}
          {...rest}
          errors={
            touched[field.name] && errors[field.name]
              ? errors[field.name]
              : undefined
          }
        />
      )}
    </Field>
  );
}
