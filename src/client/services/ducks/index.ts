import { combineReducers } from 'redux';

import { Reducer as AuthReducer } from './auth';

export const reducers = combineReducers({ AuthReducer });
