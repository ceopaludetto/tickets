import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Container, Title, Header, Body, Labels } from './styles';

interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const DndType = 'TASK';

export function Task({ title, children, ...rest }: TaskProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: DndType },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: DndType,
    hover(item, monitor) {},
  });

  dragRef(dropRef(ref));

  return (
    <Container isDragging={isDragging} ref={ref} {...rest}>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Body>
        <Labels />
        {children}
      </Body>
    </Container>
  );
}
