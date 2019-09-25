import React, { useRef } from 'react';
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';

import { Container, Title, Body, Labels, Label, Content } from './styles';

interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Partial<Ticket>;
  index: number;
}

export const DndType = 'TASK';

interface TaskType extends DragObjectWithType {
  index: number;
}

export function Task({ index, data, ...rest }: TaskProps) {
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

      // eslint-disable-next-line no-console
      console.log('foi');
    },
  });

  dragRef(dropRef(ref));

  return (
    <Container isDragging={isDragging} ref={ref} {...rest}>
      <Body>
        {!!data.labels && !!data.labels.length && (
          <Labels>
            {data.labels.map(l => (
              <Label key={l._id} title={l.descricao} color={l.cor} />
            ))}
          </Labels>
        )}
        {data.nome && <Title>{data.nome}</Title>}
        <Content>{data.descricao}</Content>
      </Body>
    </Container>
  );
}
