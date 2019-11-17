import React from 'react';
import { Button } from '@material-ui/core';
// import { DndProvider } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { useQuery } from '@apollo/react-hooks';

import { Page } from '@/client/components/composed';

// import { Page, Task } from '@/client/components/composed';
// import { Button } from '@/client/components/form';
// import { FindAllTickets } from '@/client/graphql/tickets.gql';

export default function Mesa() {
  // const { data } = useQuery<FindAllTicketsQuery>(FindAllTickets);

  // return (
  //   <DndProvider backend={HTML5Backend}>
  //     <Page
  //       title="Mesa"
  //       subTitle="Visão Geral"
  //       append={<Button>Novo chamado</Button>}
  //       helmetProps={{
  //         title: 'Mesa',
  //       }}
  //     >
  //       {data &&
  //         data.findAllTickets &&
  //         data.findAllTickets.map((t, i) => (
  //           <Task index={i} key={t._id} data={t} />
  //         ))}
  //     </Page>
  //   </DndProvider>
  // );

  return (
    <Page
      title="Desk"
      subTitle="Pendências"
      append={
        <Button variant="contained" color="secondary">
          Novo ticket
        </Button>
      }
    >
      dnd
    </Page>
  );
}
