import React, { useRef } from 'react';
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';

import { Container, Title, Header, Body, Labels } from './styles';

interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  index: number;
  mock?: {
    id?: string;
  };
}

export const DndType = 'TASK';

interface TaskType extends DragObjectWithType {
  index: number;
}

export function Task({ title, children, index, ...rest }: TaskProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: DndType, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: DndType,
    hover(item: TaskType, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) {
        return;
      }

      if (!ref.current) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();

      if (!draggedOffset) {
        return;
      }

      const draggedTop = draggedOffset.y - targetSize.top;

      if (
        (draggedIndex < targetIndex && draggedTop < targetCenter) ||
        (draggedIndex > targetIndex && draggedTop > targetCenter)
      ) {
        return;
      }

      console.log('foi');
    },
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
