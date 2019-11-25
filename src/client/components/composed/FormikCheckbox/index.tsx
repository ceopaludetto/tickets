import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel';
import { useField } from 'formik';

interface FormikCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  CheckboxProps?: Omit<CheckboxProps, 'name'>;
}

export function FormikCheckbox({ name, label, id }: FormikCheckboxProps) {
  const [field] = useField(name);

  return <FormControlLabel control={<Checkbox id={id} name={name} {...field} />} label={label} />;
}
