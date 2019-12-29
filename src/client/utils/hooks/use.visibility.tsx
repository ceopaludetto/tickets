import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { IconButton } from '@/client/components/form';

export function useVisibility() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = (toggle?: boolean) => () => (toggle ? setVisible(toggle) : setVisible(!isVisible));

  const render = (is?: any, isNot?: any) => {
    if (is && isNot) {
      return isVisible ? is : isNot;
    }
    return isVisible ? <FiEyeOff /> : <FiEye />;
  };

  const mapVisibilityProps = () => ({
    type: render('text', 'password'),
    append: (
      <IconButton onClick={toggleVisibility()} type="button" aria-label={render('Esconder senha', 'Mostrar senha')}>
        {render()}
      </IconButton>
    ),
  });

  return { isVisible, render, toggleVisibility, mapVisibilityProps };
}

function initialState<T extends any[]>(visibilities: T) {
  let props = {};
  visibilities.forEach(t => {
    props = { ...props, [t]: false };
  });

  return props as { [P in T[number]]: boolean };
}

export function useMultipleVisibility<T extends any[]>(visibilities: T) {
  const [isVisible, setVisible] = useState(initialState(visibilities));

  const toggleVisibility = (v: T[number], toggle?: boolean) => () =>
    toggle ? setVisible({ [v]: toggle }) : setVisible({ [v]: !isVisible[v] });

  const render = (v: T[number], is?: any, isNot?: any) => {
    if (is && isNot) {
      return isVisible[v] ? is : isNot;
    }
    return isVisible[v] ? <FiEyeOff /> : <FiEye />;
  };

  const mapVisibilityProps = (v: T[number]) => ({
    type: render(v, 'text', 'password'),
    append: (
      <IconButton onClick={toggleVisibility(v)} type="button" aria-label={render('Esconder senha', 'Mostrar senha')}>
        {render(v)}
      </IconButton>
    ),
  });

  return { isVisible, render, toggleVisibility, mapVisibilityProps };
}
