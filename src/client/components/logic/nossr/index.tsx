import React, { useEffect } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

import { NoSSRProps } from './index.dto';

export function NoSSR({ children, defer, fallback }: NoSSRProps) {
  const [mountedState, setMountedState] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);

  useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  return <>{mountedState ? children : fallback}</>;
}
