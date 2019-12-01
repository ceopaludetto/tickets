import React, { useState } from 'react';
import { VisibilityOffOutlined, VisibilityOutlined } from '@material-ui/icons';
import { useToggle } from 'react-use';

export function useVisibility(initial = false) {
  const [visibility, toggleVisibility] = useToggle(initial);

  function render() {
    return visibility ? <VisibilityOffOutlined /> : <VisibilityOutlined />;
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
  const [visibility, setVisibility] = useState<UseMultipleVisibilityState>(mapArrToObj(props));

  function toggleVisibility(p: T[number]) {
    return () =>
      setVisibility({
        ...visibility,
        [p]: !visibility[p],
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderVisibility(p: T[number], tru?: any, fals?: any) {
    if (tru && fals) {
      return visibility[p] ? tru : fals;
    }

    return visibility[p] ? <VisibilityOffOutlined /> : <VisibilityOutlined />;
  }

  return { visibility, toggleVisibility, renderVisibility };
}
