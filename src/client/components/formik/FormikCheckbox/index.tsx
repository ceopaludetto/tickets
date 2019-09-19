import React from 'react';
import { FieldProps, Field } from 'formik';

import { Checkbox, CheckboxProps } from '@/client/components/form';

export function FormikCheckbox({ name, ...rest }: CheckboxProps) {
  return (
    <Field type="checkbox" name={name}>
      {({ field, form: { touched, errors } }: FieldProps) => (
        <Checkbox
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
