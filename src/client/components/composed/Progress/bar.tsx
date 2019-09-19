import React from 'react';

import { BarContainer, BarShadow } from './styles';

interface BarProps {
  animationDuration: number;
  progress: number;
}

export function Bar({ animationDuration, progress }: BarProps) {
  return (
    <BarContainer
      animationDuration={animationDuration}
      style={{
        width: `${progress * 100}%`,
      }}
    >
      <BarShadow />
    </BarContainer>
  );
}
