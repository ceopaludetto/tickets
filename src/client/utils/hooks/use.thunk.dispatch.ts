import { AxiosInstance } from 'axios';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { AllActions, AllReducers } from '@/client/services/ducks';

export const useThunkDispatch = () => useDispatch<ThunkDispatch<AllReducers, AxiosInstance, AllActions>>();
