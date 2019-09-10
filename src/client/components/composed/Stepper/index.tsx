import React, { useMemo } from 'react';
import { IconType } from 'react-icons';

import { Step } from '@/client/components/layout';
import { Container } from './styles';

interface StepProp {
  name: string;
  icon: IconType;
  description?: string;
}

interface StepperProps {
  steps: StepProp[];
  inverted?: boolean;
  currentPage?: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({
  steps,
  inverted = false,
  currentPage = 0,
  onStepClick,
}: StepperProps) {
  const stepsCount = useMemo(() => steps.length, [steps]);

  function getCurrentStatus(index: number): 'done' | 'undone' | 'active' {
    if (currentPage === index) {
      return 'active';
    }

    if (currentPage > index) {
      return 'done';
    }

    return 'undone';
  }

  function isLast(index: number) {
    return stepsCount - 1 === index;
  }

  return (
    <Container>
      {steps.map((s, i) => (
        <Step
          icon={s.icon}
          status={getCurrentStatus(i)}
          content={s.name}
          title={s.name}
          inverted={inverted}
          last={isLast(i)}
          onClick={() => onStepClick && onStepClick(i)}
        />
      ))}
    </Container>
  );
}
