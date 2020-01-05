import { action } from 'typesafe-actions';

import { TicketsTypes, TicketDTO } from './types';
import { ApiError } from '@/client/utils/error';

export const loadRequest = (shouldToggleProgress?: boolean) =>
  action(TicketsTypes.LOAD_REQUEST, { shouldToggleProgress });

export const loadSuccess = (data: TicketDTO[]) => action(TicketsTypes.LOAD_SUCCESS, { data });

export const loadFailure = (error: ApiError) => action(TicketsTypes.LOAD_FAILURE, { error });
