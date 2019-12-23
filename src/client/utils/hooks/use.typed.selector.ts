import { useSelector } from 'react-redux';

import { AllReducers } from '@/client/services/ducks';

export const useTypedSelector = <T>(selector: (state: AllReducers) => T) => useSelector<AllReducers, T>(selector);
