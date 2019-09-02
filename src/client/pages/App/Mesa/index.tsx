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
        {[
          ...Array.from(new Array(10)).map((v, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Task key={i} index={i} title="Mouse parou de funcionar">
              Problemas no leitor óptico {i}
            </Task>
          )),
        ]}
      </Page>
    </DndProvider>
  );
}
