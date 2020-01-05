import React, { useEffect } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

interface NoSSRProps {
  children: React.ReactNode;
  defer?: boolean;
  fallback?: React.ReactNode;
}

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
