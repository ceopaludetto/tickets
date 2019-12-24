import React from 'react';
import clsx from 'clsx';

import s from './form.scss';
import u from '@/client/scss/utils.scss';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  error?: string;
}

export function Form({ children, error, ...rest }: FormProps) {
  return (
    <form {...rest}>
      <>
        {!!error && <span className={clsx(s.error, u['xs:mt-3'])}>{error}</span>}
        {children}
      </>
    </form>
  );
}
