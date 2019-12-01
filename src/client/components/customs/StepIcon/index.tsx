import React from 'react';
import clsx from 'clsx';
import { Check } from '@material-ui/icons';

import { useStyles } from './styles';

interface StepIconProps {
  active?: boolean;
  completed?: boolean;
}

export function CustomStepIcon(props: StepIconProps) {
  const classes = useStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}
