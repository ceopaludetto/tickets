import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Control, ControlProps } from '@/client/components/form/control';

export function FormControl({ name, helperText, ...rest }: Omit<ControlProps, 'ref' | 'name'> & { name: string }) {
  const { register, errors } = useFormContext();

  return (
    <Control
      name={name}
      ref={register}
      error={!!errors[name]}
      helperText={typeof errors[name] !== 'undefined' ? errors[name]?.message : helperText}
      {...rest}
    />
  );
}
