import React from 'react';
import { useField, useFormikContext } from 'formik';
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';

export type FormikDatePickerProps = Partial<Omit<KeyboardDatePickerProps, 'name'>> & {
  name: string;
};

export function FormikDatePicker({ name, helperText, ...rest }: FormikDatePickerProps) {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <KeyboardDatePicker
      value={field.value}
      name={field.name}
      onBlur={field.onBlur}
      onChange={date => setFieldValue(name as never, date)}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : helperText}
      {...rest}
    />
  );
}
