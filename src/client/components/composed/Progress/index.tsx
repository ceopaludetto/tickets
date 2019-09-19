import React from 'react';
import { useNProgress } from '@tanem/react-nprogress';

import { Container } from './styles';
import { Bar } from './bar';

interface ProgressProps {
  isAnimating?: boolean;
}

export function Progress({ isAnimating }: ProgressProps) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
}
