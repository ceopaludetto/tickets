import { action } from 'typesafe-actions';

import { ApiError } from '@/client/utils/error';

import { TicketsTypes, TicketDTO } from './types';

export const loadRequest = () => action(TicketsTypes.LOAD_REQUEST);

export const loadSuccess = (data: TicketDTO[]) => action(TicketsTypes.LOAD_SUCCESS, { data });

export const loadFailure = (error: ApiError) => action(TicketsTypes.LOAD_FAILURE, { error });
