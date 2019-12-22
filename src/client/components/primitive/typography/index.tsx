/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import clsx from 'clsx';

import styles from './index.scss';

import { ElementProps } from '@/client/utils/common.dto';

type TypographyProps<T extends keyof JSX.IntrinsicElements | React.ComponentType<any> = 'span'> = ElementProps<T> & {
  as?: T;
  variant?: 'label' | 'button' | 'p';
  children?: React.ReactNode;
};

export function Typography<E extends keyof JSX.IntrinsicElements | React.ComponentType<any> = 'span'>({
  as: Component,
  children,
  variant = 'button',
  className,
  ...rest
}: TypographyProps<E>) {
  const classes = clsx(styles[variant], className);

  return Component ? (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  ) : (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
