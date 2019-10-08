import React from 'react';
import { Rifm } from 'rifm';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { Field, FieldProps } from 'formik';

interface RifmProps {
  format?: (str: string) => string;
  replace?: (str: string) => string;
  mask?: boolean;
  accept?: RegExp;
}

export type FormikFieldProps = Omit<TextFieldProps, 'name' | 'variant'> &
  RifmProps & { name: string; variant?: 'outlined' };

export function FormikField({
  name,
  format,
  replace,
  mask,
  accept,
  helperText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant = 'outlined',
  ...props
}: FormikFieldProps) {
  return (
    <Field
      name={name}
      render={({ field, form }: FieldProps) =>
        format ? (
          <Rifm
            format={format}
            replace={replace}
            mask={mask}
            accept={accept}
            onChange={v => form.setFieldValue(name, v)}
            value={field.value}
          >
            {({ onChange, value }) => (
              <TextField
                {...props}
                {...field}
                error={!!(form.touched[name] && form.errors[name])}
                helperText={
                  form.touched[name] && form.errors[name]
                    ? form.errors[name]
                    : helperText
                }
                onChange={onChange}
                value={value}
              />
            )}
          </Rifm>
        ) : (
          <TextField
            {...field}
            {...props}
            error={!!(form.touched[name] && form.errors[name])}
            helperText={
              form.touched[name] && form.errors[name]
                ? form.errors[name]
                : helperText
            }
          />
        )
      }
    />
  );
}
