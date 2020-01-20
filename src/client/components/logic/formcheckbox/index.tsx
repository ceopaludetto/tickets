import React from 'react';

import { useField, useFormikContext } from 'formik';

import { Checkbox } from '@/client/components/form/checkbox';
import { CheckboxProps } from '@/client/components/form/checkbox/index.dto';

export function FormCheckbox({ name, ...rest }: Omit<CheckboxProps, 'ref' | 'name'> & { name: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ value, ...field }] = useField({ name, type: 'checkbox' });
  const { isSubmitting } = useFormikContext();

  return <Checkbox {...field} name={name} disabled={isSubmitting} {...rest} />;
}
