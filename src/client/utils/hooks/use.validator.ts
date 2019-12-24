import { useImmer } from 'use-immer';
import { useDeepCompareEffect } from 'react-use';

import { ApiError } from '../error';
import { AllReducers } from '@/client/services/ducks';

interface ErrorMappingState {
  hasError: boolean;
  errorInfo?: Partial<
    {
      [P in keyof ApiError]: ApiError[P];
    }
  >;
  fieldLevelError?: boolean;
}

export function useValidator(s: AllReducers[keyof AllReducers][]) {
  const [errorMapping, setErrorMapping] = useImmer<ErrorMappingState[]>([]);

  useDeepCompareEffect(() => {
    if (Array.isArray(s) && s.length) {
      setErrorMapping(draft => {
        s.forEach((item, i) => {
          if (!draft[i]) {
            draft[i] = {
              hasError: false,
              errorInfo: undefined,
              fieldLevelError: false,
            };
          }

          if (item.failure && item.data instanceof ApiError) {
            draft[i].hasError = true;
            draft[i].errorInfo = item.data as ApiError;

            if ((item.data as ApiError).type === 'ClassValidator') {
              draft[i].fieldLevelError = true;
            }
          } else {
            draft[i].hasError = false;
            draft[i].errorInfo = undefined;
            draft[i].fieldLevelError = false;
          }
        });

        return draft;
      });
    }
  }, [s]);

  return errorMapping;
}
