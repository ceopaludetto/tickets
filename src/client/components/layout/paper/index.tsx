import React, { forwardRef } from 'react';

import { PaperProps } from './index.dto';
import { Container, Inner } from './styles';

export function Paper({
  children,
  border = false,
  elevate = false,
  small = false,
  hasInner = false,
  ...rest
}: PaperProps) {
  return (
    <Container border={border} elevate={elevate} hasInner={hasInner} small={small} {...rest}>
      {children}
    </Container>
  );
}

Paper.Inner = forwardRef(
  (
    { children, small = false, ...rest }: React.HTMLAttributes<HTMLDivElement> & Pick<PaperProps, 'small'>,
    ref: React.Ref<HTMLDivElement>
  ) => (
    <Inner ref={ref} small={small} {...rest}>
      {children}
    </Inner>
  )
);
