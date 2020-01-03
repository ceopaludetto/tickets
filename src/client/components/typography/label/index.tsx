import clsx from 'clsx';
import React from 'react';

import styles from './label.scss';

export function Label({ children, className, htmlFor, ...rest }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const classes = clsx(styles.label, className);

  return (
    <label htmlFor={htmlFor} className={classes} {...rest}>
      {children}
    </label>
  );
}
