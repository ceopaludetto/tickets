import { useState } from 'react';
import { useToggle } from 'react-use';

export function useRandomString() {
  const [isAnimating, changeCurrentKey] = useToggle(false);
  const [currentKey, setNewKey] = useState<string | undefined>(undefined);

  function toggleIsAnimating(next?: boolean) {
    if (next) {
      setNewKey(
        typeof window === 'undefined'
          ? Buffer.from(String(Math.random())).toString('base64')
          : btoa(String(Math.random()))
      );
    }

    changeCurrentKey(next);
  }

  return { currentKey, toggleIsAnimating, isAnimating };
}
