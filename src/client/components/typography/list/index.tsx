import clsx from 'clsx';
import React from 'react';

import s from './list.scss';

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  gutterBottom?: boolean;
}

export function List({ children, gutterBottom = false, ...rest }: ListProps) {
  return (
    <ul className={clsx(s.list, { [s.margin]: gutterBottom })} {...rest}>
      {children}
    </ul>
  );
}

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
}

List.Item = ({ children, disabled, ...rest }: ListItemProps) => {
  return (
    <li className={clsx(s.item, { [s.disabled]: disabled })} {...rest}>
      {children}
    </li>
  );
};
