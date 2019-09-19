import React from 'react';
import { FieldProps, Field } from 'formik';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

import { Control, ControlProps } from '@/client/components/form';

export function FormikMaskedControl({
  name,
  mask,
  showMask,
  guide,
  ...rest
}: ControlProps & MaskedInputProps) {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors } }: FieldProps) => (
        <MaskedInput
          {...field}
          {...rest}
          mask={mask}
          showMask={showMask}
          guide={guide}
          render={(ref, props) => (
            <Control
              {...props}
              ref={ref}
              errors={
                touched[field.name] && errors[field.name]
                  ? errors[field.name]
                  : undefined
              }
            />
          )}
        />
      )}
    </Field>
  );
}
