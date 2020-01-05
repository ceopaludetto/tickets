import { ApiError } from '@/client/utils/error';
import { TicketDTO } from '@/server/models/ticket/ticket.dto';

export const enum TicketsTypes {
  LOAD_REQUEST = '@tickets:LOAD_REQUEST',
  LOAD_SUCCESS = '@tickets:LOAD_SUCCESS',
  LOAD_FAILURE = '@tickets:LOAD_FAILURE',
}

export interface TicketsState {
  readonly error: boolean | ApiError;
  readonly loading: boolean;
  readonly data: TicketDTO[];
}

export { TicketDTO };
