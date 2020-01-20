import React, { useMemo } from 'react';
import { useDeepCompareEffect } from 'react-use';

import { ValidationError } from 'class-validator/validation/ValidationError';
import { useFormikContext, Form as FormikForm } from 'formik';

import { ApplicationState } from '@/client/services/ducks';
import { useValidator } from '@/client/utils';

import { Error } from './styles';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  error?: string;
  statesToValidate?: ApplicationState[keyof ApplicationState][];
}

export function Form({ children, error, statesToValidate, ...rest }: FormProps) {
  const { setFieldError } = useFormikContext();
  const res = useValidator(statesToValidate);

  useDeepCompareEffect(() => {
    const withErrors = res.filter(x => x.hasError);
    if (withErrors.some(x => x.fieldLevelError)) {
      const firstError = withErrors.find(x => x.fieldLevelError);
      if (firstError?.errorInfo?.context[0].constraints) {
        (firstError.errorInfo.context as ValidationError[]).forEach(err => {
          Object.keys(err.constraints).forEach(c => {
            setFieldError(err.property, err.constraints[c]);
          });
        });
      }
    }
  }, [res]);

  const mappedError = useMemo(() => {
    const withErrors = res.filter(x => x.hasError);
    if (withErrors.some(x => !x.fieldLevelError)) {
      return withErrors.find(x => !x.fieldLevelError)?.errorInfo?.message;
    }

    if (error) {
      return error;
    }

    return '';
  }, [res, error]);

  return (
    <FormikForm {...rest}>
      <>
        {!!mappedError && <Error>{mappedError}</Error>}
        {children}
      </>
    </FormikForm>
  );
}
