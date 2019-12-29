import React from 'react';
import { useField, useFormikContext } from 'formik';

import { Checkbox, CheckboxProps } from '@/client/components/form/checkbox';

export function FormCheckbox({ name, ...rest }: Omit<CheckboxProps, 'ref' | 'name'> & { name: string }) {
  const [field] = useField(name);
  const { isSubmitting } = useFormikContext();

  return <Checkbox {...field} name={name} disabled={isSubmitting} {...rest} />;
}
