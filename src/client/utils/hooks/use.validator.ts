import produce from 'immer';
import { useState } from 'react';
import { useDeepCompareEffect } from 'react-use';

import { ApiError } from '../error';

interface ErrorMappingState {
  hasError: boolean;
  errorInfo?: Partial<
    {
      [P in keyof ApiError]: ApiError[P];
    }
  >;
  fieldLevelError?: boolean;
}

export function useValidator(s: any) {
  const [errorMapping, setErrorMapping] = useState<ErrorMappingState>({ hasError: false });

  useDeepCompareEffect(() => {
    if (s.data && s.data instanceof ApiError) {
      setErrorMapping(
        produce(errorMapping, draft => {
          draft.hasError = true;
          draft.errorInfo = s.data;

          if (s.data.type === 'ClassValidator') {
            draft.fieldLevelError = true;
          }
        })
      );
    } else {
      setErrorMapping(
        produce(errorMapping, draft => {
          draft.hasError = false;
          draft.errorInfo = {};
        })
      );
    }
  }, [s]);

  return errorMapping;
}
