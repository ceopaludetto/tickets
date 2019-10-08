import React from 'react';
import { useNProgress } from '@tanem/react-nprogress';
import { NoSsr } from '@material-ui/core';

import { useStyles } from './styles';

interface ProgressProps {
  isAnimating?: boolean;
}

export function Progress({ isAnimating }: ProgressProps) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });
  const classes = useStyles({
    isFinished,
    animationDuration,
  });

  return (
    <NoSsr>
      <div className={classes.container}>
        <div className={classes.barContainer} style={{ width: `${progress}%` }}>
          <div className={classes.barShadow} />
        </div>
      </div>
    </NoSsr>
  );
}
