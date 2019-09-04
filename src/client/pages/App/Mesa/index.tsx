import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { useQuery } from '@apollo/react-hooks';

import { Page, Task } from '@/client/components/composed';
import { Button } from '@/client/components/form';
import { FindAllTickets } from '@/client/graphql/ticket.gql';
import {
  FindAllTicketsQuery,
  FindAllTicketsQueryVariables,
} from '@/client/typescript/graphql';

export default function Mesa() {
  const { data } = useQuery<FindAllTicketsQuery, FindAllTicketsQueryVariables>(
    FindAllTickets
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Page
        title="Mesa"
        subTitle="Visão Geral"
        append={<Button>Novo chamado</Button>}
      >
        {data &&
          data.findAllTickets &&
          data.findAllTickets.map((t, i) => (
            <Task index={i} key={t._id} title={t.nome} labels={t.labels}>
              {t.descricao}
            </Task>
          ))}
      </Page>
    </DndProvider>
  );
}
