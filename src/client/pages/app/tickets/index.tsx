import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/client/components';
import { TicketsActions } from '@/client/services/ducks';
import { useTypedSelector } from '@/client/utils';

export default function AppTickets() {
  const dispatch = useDispatch();
  const ticketState = useTypedSelector(state => state.Ticket);

  return (
    <div>
      <Button onClick={() => dispatch(TicketsActions.loadRequest())}>refetch</Button>
      <pre>{JSON.stringify(ticketState)}</pre>
    </div>
  );
}
