import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { ValidationError } from 'class-validator/validation/ValidationError';
import clsx from 'clsx';

import s from './form.scss';
import u from '@/client/scss/utils.scss';
import { useValidator } from '@/client/utils';
import { AllReducers } from '@/client/services/ducks';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  error?: string;
  statesToValidate: AllReducers[keyof AllReducers][];
}

export function Form({ children, error, statesToValidate, ...rest }: FormProps) {
  const { setError } = useFormContext();
  const res = useValidator(statesToValidate);

  useDeepCompareEffect(() => {
    const withErrors = res.filter(x => x.hasError);
    if (withErrors.some(x => x.fieldLevelError)) {
      const firstError = withErrors.find(x => x.fieldLevelError);
      if (firstError?.errorInfo?.context[0].constraints) {
        (firstError.errorInfo.context as ValidationError[]).forEach(err => {
          Object.keys(err.constraints).forEach(c => {
            setError(err.property, c, err.constraints[c]);
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
    <form {...rest}>
      <>
        {!!mappedError && <span className={clsx(s.error, u['xs:mt-1'], u['xs:mb-2'])}>{mappedError}</span>}
        {children}
      </>
    </form>
  );
}
