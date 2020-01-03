import { useField, useFormikContext } from 'formik';
import React from 'react';

import { Control, ControlProps } from '@/client/components/form/control';

export function FormControl({ name, helperText, ...rest }: Omit<ControlProps, 'ref' | 'name'> & { name: string }) {
  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  return (
    <Control
      {...field}
      name={name}
      disabled={isSubmitting}
      error={!!meta.error && !!meta.touched}
      helperText={typeof meta.error !== 'undefined' && meta.touched ? meta.error : helperText}
      {...rest}
    />
  );
}
