import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useToggle } from 'react-use';

export function useVisibility(initial: boolean = false) {
  const [visibility, toggleVisibility] = useToggle(initial);

  function render() {
    return visibility ? <FiEyeOff /> : <FiEye />;
  }

  return { visibility, toggleVisibility, render };
}

interface UseMultipleVisibilityState {
  [key: string]: boolean;
}

function mapArrToObj(props: string[]) {
  let newProps: UseMultipleVisibilityState = {
    [props[0]]: false,
  };

  props.forEach(p => {
    newProps = { ...newProps, [p]: false };
  });

  return newProps;
}

export function useMultipleVisibility<T extends string[]>(props: T) {
  const [visibility, setVisibility] = useState<UseMultipleVisibilityState>(
    mapArrToObj(props)
  );

  function toggleVisibility(p: T[number]) {
    return () =>
      setVisibility({
        ...visibility,
        [p]: !visibility[p],
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function render(p: T[number], tru?: any, fals?: any) {
    if (tru && fals) {
      return visibility[p] ? tru : fals;
    }

    return visibility[p] ? <FiEyeOff /> : <FiEye />;
  }

  return { visibility, toggleVisibility, render };
}
