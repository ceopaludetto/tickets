import React from 'react';
import { FieldProps, Field } from 'formik';
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from '@material-ui/pickers';

export type FormikDatePickerProps = Partial<
  Omit<KeyboardDatePickerProps, 'name'>
> & {
  name: string;
};

export function FormikDatePicker({
  name,
  helperText,
  ...rest
}: FormikDatePickerProps) {
  return (
    <Field
      name={name}
      render={({ field, form }: FieldProps) => (
        <KeyboardDatePicker
          value={field.value}
          name={field.name}
          onBlur={field.onBlur}
          onChange={date => form.setFieldValue(name, date)}
          error={!!(form.touched[field.name] && form.errors[field.name])}
          helperText={
            form.touched[field.name] && form.errors[field.name]
              ? form.errors[field.name]
              : helperText
          }
          {...rest}
        />
      )}
    />
  );
}
