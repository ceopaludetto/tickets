import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { ApplicationState } from '@/client/services/ducks';

export const useTypedSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
