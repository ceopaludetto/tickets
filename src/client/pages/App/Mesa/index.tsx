import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Page, Task } from '@/client/components/composed';
import { Button } from '@/client/components/form';

export default function Mesa() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Page
        title="Mesa"
        subTitle="Visão Geral"
        append={<Button>Novo chamado</Button>}
      >
        <Task title="Mouse parou de funcionar">Problemas no leitor óptico</Task>
      </Page>
    </DndProvider>
  );
}
