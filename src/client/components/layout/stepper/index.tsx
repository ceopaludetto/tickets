import React from 'react';
import clsx from 'clsx';

import s from './stepper.scss';

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  togglePage: (value: number) => (e: React.MouseEvent<any>) => void;
  labels: {
    text: string;
    icon: React.ElementType<any>;
  }[];
}

export function Stepper({ totalPages, labels, currentPage, togglePage, nextPage, ...rest }: StepperProps) {
  if (labels.length !== totalPages) {
    throw new Error('Stepper must have same quantity of labels');
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') {
      nextPage();
    }
  };

  return (
    <div className={s.stepper} {...rest}>
      {labels.map((l, i) => (
        <React.Fragment key={l.text}>
          <div
            tabIndex={0}
            role="button"
            onKeyUp={handleKeyUp}
            onClick={togglePage(i)}
            className={clsx(s.item, { [s.active]: i <= currentPage })}
          >
            <div className={s.icon}>
              <l.icon size={24} />
            </div>
            <span className={s.text}>{l.text}</span>
          </div>
          {i + 1 !== totalPages && (
            <div role="status" className={clsx(s.divider, { [s.active]: i + 1 <= currentPage })} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
