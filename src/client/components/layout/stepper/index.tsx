import React from 'react';

import { StepperProps } from './index.dto';
import { Container, Item, Icon, Text, Divider } from './styles';

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
    <Container {...rest}>
      {labels.map((l, i) => (
        <React.Fragment key={l.text}>
          <Item
            active={i <= currentPage}
            tabIndex={0}
            role="button"
            onKeyUp={handleKeyUp}
            onClick={() => togglePage(i)}
          >
            <Icon>
              <l.icon size={24} />
            </Icon>
            <Text>{l.text}</Text>
          </Item>
          {i + 1 !== totalPages && <Divider role="status" active={i + 1 <= currentPage} />}
        </React.Fragment>
      ))}
    </Container>
  );
}
