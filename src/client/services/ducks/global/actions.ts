import { action } from 'typesafe-actions';

import { GlobalTypes } from './types';

export const loadRequest = () => action(GlobalTypes.PAGE_REQUEST);

export const loadSuccess = () => action(GlobalTypes.PAGE_SUCCESS);

export const loadFailure = () => action(GlobalTypes.PAGE_FAILURE);
